import { getAuthenticatedUser } from "@/src/lib/auth";
import { getListsByUserId } from "@/src/models/list";
import AppError from "@/src/errors/appError";
import {
  createNewList,
  modifyList,
  removeList,
} from "@/src/services/listService";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    const lists = await getListsByUserId(user.id);
    return Response.json(lists);
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
    return Response.json(list, { status: 201 });
  } catch (err: Error | any) {
    const status = err instanceof AppError ? err.statusCode : 500;
    return Response.json({ error: err.message }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const { id } = await request.json();
    await removeList(id, user.id);
    return Response.json({ success: true }, { status: 200 });
  } catch (err: Error | any) {
    const status = err instanceof AppError ? err.statusCode : 500;
    return Response.json({ error: err.message }, { status });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const { id, name } = await request.json();
    const updatedList = await modifyList(id, user.id, { name: name.trim() });
    return Response.json(updatedList);
  } catch (err: Error | any) {
    const status = err instanceof AppError ? err.statusCode : 500;
    return Response.json({ error: err.message }, { status });
  }
}
