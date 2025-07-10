import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/src/lib/auth";
import { itemOutputSchema } from "@/src/schemas/item";
import { modifyItem, removeItem } from "@/src/services/itemService";
import AppError from "@/src/errors/appError";

/**
 * @swagger
 * /api/lists/{listId}/items/{itemId}:
 *   patch:
 *     tags:
 *       - items
 *     summary: Atualiza um item específico
 *     parameters:
 *       - name: listId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: itemId
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
 *       200:
 *         description: Item atualizado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ listId: string; itemId: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    const data = await request.json();
    const { itemId } = await context.params;

    const item = await modifyItem(itemId, user.id, data);
    const parsedItem = itemOutputSchema.parse(item);
    return NextResponse.json(parsedItem, { status: 200 });
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
 * /api/lists/{listId}/items/{itemId}:
 *   delete:
 *     tags:
 *       - items
 *     summary: Remove um item específico
 *     parameters:
 *       - name: listId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ listId: string; itemId: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    const { itemId } = await context.params;

    await removeItem(itemId, user.id);
    return NextResponse.json({ sucess: true }, { status: 200 });
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
