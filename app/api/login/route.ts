import { findUserByEmail } from "@/src/services/userService";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/src/utils/jwt";
import AuthError from "@/src/errors/authError";

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

    const valid = bcrypt.compareSync(password, user.password!);
    if (!valid) {
      throw new AuthError("Credenciais inválidas");
    }

    const token = generateToken({ sub: user.id, email: user.email });

    const response = NextResponse.json({ success: true }, { status: 200 });
    
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 3, // 3 dias em segundos
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (err: Error | any) {
    return Response.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}