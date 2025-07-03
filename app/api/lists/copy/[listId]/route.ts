import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/src/lib/auth";
import { copyList } from "@/src/services/listService";
import { listOutputSchema } from "@/src/schemas/list";
import { ZodError } from "zod";

/**
 * @swagger
 * /api/lists/copy/{listId}:
 *   post:
 *     tags:
 *       - lists
 *     summary: Copia uma lista específica
 *     parameters:
 *       - name: listId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Lista copiada com sucesso
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */

export async function POST(
  _request: NextRequest,
  context: { params: Promise<{ listId: string }> }
) {
  const user = await getAuthenticatedUser();
  const { listId } = await context.params;

  try {
    const newList = await copyList(listId, user.id);
    const parsedList = listOutputSchema.parse(newList);
    return NextResponse.json(parsedList, { status: 201 });
  } catch (err: Error | any) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Erro de validação", issues: err.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}
