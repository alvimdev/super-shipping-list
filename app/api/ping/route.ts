import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/ping:
 *  get:
 *    summary: Verifica se a API está funcionando e se o banco de dados está acessível
 *    tags:
 *      - ping
 *    responses:
 *      200:
 *        description: API está funcionando
 *       content:
 *         application/json:
 *          schema:
 *           type: object
 *          properties:
 *           message:
 *            type: string
 *           example: "pong"
 *      500:
 *        description: Erro interno do servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    example: "Erro interno no servidor"
 */
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`; // Pinga direto no banco (não acessa tabelas específicas)
    return NextResponse.json({ message: "pong" });
  } catch (error) {
    console.error("Erro ao executar ping:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}