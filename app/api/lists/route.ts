import { getAuthenticatedUser } from "@/src/lib/auth";
import { listOutputSchema } from "@/src/schemas/list";
import AppError from "@/src/errors/appError";
import {
  createNewList,
  getUserLists
} from "@/src/services/listService";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    const lists = await getUserLists(user.id);
    const parsedLists = lists.map((list) => listOutputSchema.parse(list));
    return Response.json(parsedLists, { status: 200 });
  } catch (err: Error | any) {
    const status = err instanceof AppError ? err.statusCode : 500;
    return Response.json({ error: err.message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const { name } = await request.json();
    const list = await createNewList(user.id, name.trim());
    const parsedList = listOutputSchema.parse(list);
    return Response.json(parsedList, { status: 201 });
  } catch (err: Error | any) {
    const status = err instanceof AppError ? err.statusCode : 500;
    return Response.json({ error: err.message }, { status });
  }
}