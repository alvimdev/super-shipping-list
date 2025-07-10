import AppError from "@/src/errors/appError";
import { getAuthenticatedUser } from "@/src/lib/auth";
import { listOutputSchema } from "@/src/schemas/list";
import { createNewList, getUserLists } from "@/src/services/listService";

/**
 * @swagger
 * /api/lists:
 *   get:
 *     tags:
 *       - lists
 *     summary: Retorna todas as listas do usuário autenticado
 *     responses:
 *       200:
 *         description: Listas retornadas com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    const lists = await getUserLists(user.id);
    const parsedLists = lists.map((list) => listOutputSchema.parse(list));
    return Response.json(parsedLists, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof AppError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    return Response.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/lists:
 *   post:
 *     tags:
 *       - lists
 *     summary: Cria uma nova lista
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
 *       201:
 *         description: Lista criada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const { name } = await request.json();
    const list = await createNewList(user.id, name.trim());
    const parsedList = listOutputSchema.parse(list);
    return Response.json(parsedList, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof AppError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    return Response.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}