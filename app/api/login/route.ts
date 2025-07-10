import { findUserByEmail } from "@/src/services/userService";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/src/utils/jwt";
import AuthError from "@/src/errors/authError";
import AppError from "@/src/errors/appError";
import NotFoundError from "@/src/errors/notFoundError";

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Realiza o login de um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await findUserByEmail(email);
    if (!user) {
      throw new NotFoundError("Usuarário não encontrado");
    }

    const valid = bcrypt.compareSync(password, user.password!);
    if (!valid) {
      throw new AuthError("Senha incorreta");
    }

    const token = generateToken({ sub: user.id, email: user.email });

    const response = NextResponse.json({ success: true }, { status: 200 });

    const baseCookieOptions = {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 3, // 3 dias em segundos
      path: "/",
      sameSite: "lax" as const,
    };

    response.cookies.set("token", token, {
      ...baseCookieOptions,
      httpOnly: true,
    });
    response.cookies.set("auth_active", "true", {
      ...baseCookieOptions,
      httpOnly: false,
    });

    return response;
  } catch (err: unknown) {
    if (err instanceof AppError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}