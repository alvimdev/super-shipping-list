import { getAuthenticatedUser } from "@/src/lib/auth";
import { userOutputSchema } from "@/src/schemas/user";
import {
  modifyUser,
  registerUser,
  removeUser,
} from "@/src/services/userService";
import { generateToken } from "@/src/utils/jwt";

import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *       - user
 *     summary: Registra um novo usuário
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
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro de validação
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await registerUser(data);
    const token = generateToken({ sub: user.id, email: user.email });

    const response = NextResponse.json({ success: true }, { status: 201 });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 3, // 3 dias em segundos
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (err: Error | any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - user
 *     summary: Retorna os detalhes do usuário autenticado
 *     responses:
 *       200:
 *         description: Detalhes do usuário retornados com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    const parsedUser = userOutputSchema.parse(user);
    return Response.json(parsedUser, { status: 200 });
  } catch (err: Error | any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/user:
 *   patch:
 *     tags:
 *       - user
 *     summary: Atualiza os detalhes do usuário autenticado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro de validação
 */
export async function PATCH(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const data = await request.json();
    const updatedUser = await modifyUser(user.id, data);
    const parsedUser = userOutputSchema.parse(updatedUser);
    return Response.json(parsedUser, { status: 200 });
  } catch (err: Error | any) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}

/**
 * @swagger
 * /api/user:
 *   delete:
 *     tags:
 *       - user
 *     summary: Remove o usuário autenticado
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       400:
 *         description: Erro ao remover o usuário
 */
export async function DELETE() {
  try {
    const user = await getAuthenticatedUser();
    await removeUser(user.id);
    return Response.json({ success: true }, { status: 200 });
  } catch (err: Error | any) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
