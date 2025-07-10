import AppError from "@/src/errors/appError";
import { getAuthenticatedUser } from "@/src/lib/auth";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/logout:
 *   post:
 *     tags:
 *       - auth
 *     summary: Faz logout do usuário
 *     responses:
 *       204:
 *         description: Logout realizado com sucesso
 *       401:
 *         description: Usuário não autenticado
 */
export async function POST() {
  try {
    await getAuthenticatedUser();
    const response = new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
    });
    response.cookies.delete("token");
    response.cookies.set("auth_active", "false", {
      secure: process.env.NODE_ENV === "production",
      httpOnly: false,
      maxAge: 0,
      path: "/",
    });
    return response;
  } catch (err: AppError | unknown) {
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