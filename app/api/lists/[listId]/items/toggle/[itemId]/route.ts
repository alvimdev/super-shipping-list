import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/src/lib/auth";
import { itemOutputSchema } from "@/src/schemas/item";
import {
  toggleItemCompleteByID
} from "@/src/services/itemService";

/**
 * @swagger
 * /api/lists/{listId}/items/toggle/{itemId}:
 *   post:
 *     tags:
 *       - items
 *     summary: Alterna o estado de conclusão de um item específico
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
 *         description: Estado do item alternado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
export async function POST(
  _request: NextRequest,
  context: { params: Promise<{ listId: string; itemId: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    const { itemId } = await context.params;

    const item = await toggleItemCompleteByID(itemId, user.id);
    const parsedItem = itemOutputSchema.parse(item);
    return NextResponse.json(parsedItem, { status: 200 });
  } catch (err: Error | any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}