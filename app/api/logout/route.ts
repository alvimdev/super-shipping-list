import AuthError from "@/src/errors/authError";
import { getAuthenticatedUser } from "@/src/lib/auth";
import { NextRequest, NextResponse } from "next/server";

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
export async function POST(_request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      throw new AuthError("Usuário não autenticado");
    }
    const response = new NextResponse(JSON.stringify({ success: true }), { status: 200 });
    response.cookies.delete("token");
    response.cookies.set(
      "auth_active",
      "false",
      {
        secure: process.env.NODE_ENV === "production",
        httpOnly: false,
        maxAge: 0,
        path: "/",
      }
    );
    return response;
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
