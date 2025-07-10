import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/src/lib/auth";
import { listOutputSchema, listOutputNameSchema } from "@/src/schemas/list";
import { findList, modifyList, removeList } from "@/src/services/listService";

/**
 * @swagger
 * /api/lists/{listId}:
 *   delete:
 *     tags:
 *       - lists
 *     summary: Remove uma lista específica
 *     parameters:
 *       - name: listId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista removida com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ listId: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    const { listId } = await context.params;
    
    await removeList(listId, user.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: Error | any) {
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}

/**
 * @swagger
 * /api/lists/{listId}:
 *   patch:
 *     tags:
 *       - lists
 *     summary: Atualiza uma lista específica
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
 *     responses:
 *       200:
 *         description: Lista atualizada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ listId: string }> }
) {
  try {
    const user = await getAuthenticatedUser();
    const { name } = await request.json();
    const { listId } = await context.params;

    const updatedList = await modifyList(listId, user.id, { name: name.trim() });
    const parsedList = listOutputSchema.parse(updatedList);
    return NextResponse.json(parsedList, { status: 200 });
  } catch (err: Error | any) {
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}

/**
 * @swagger
 * /api/lists/{listId}:
 *   get:
 *     tags:
 *       - lists
 *     summary: Retorna uma lista específica
 *     parameters:
 *       - name: listId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
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

    const list = await findList(listId, user.id);
    const parsedList = listOutputNameSchema.parse(list);
    return NextResponse.json(parsedList, { status: 200 });
  } catch (err: Error | any) {
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}