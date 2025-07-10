import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/src/lib/auth";
import { itemOutputSchema } from "@/src/schemas/item";
import { createNewItem, getItemsFromList } from "@/src/services/itemService";
import AppError from "@/src/errors/appError";

/**
 * @swagger
 * /api/lists/{listId}/items:
 *   get:
 *     tags:
 *       - items
 *     summary: Retorna todos os itens de uma lista específica
 *     parameters:
 *       - name: listId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Itens retornados com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ listId: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    const { listId } = await context.params;

    const items = await getItemsFromList(listId, user.id);
    const parsedItems = items.map((item) => itemOutputSchema.parse(item));
    return NextResponse.json(parsedItems, { status: 200 });
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

/**
 * @swagger
 * /api/lists/{listId}/items:
 *   post:
 *     tags:
 *       - items
 *     summary: Adiciona um novo item a uma lista específica
 *     parameters:
 *       - name: listId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ listId: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    const { listId } = await context.params;
    const data = await request.json();

    const item = await createNewItem(listId, user.id, data);
    const parsedItem = itemOutputSchema.parse(item);
    return NextResponse.json(parsedItem, { status: 201 });
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