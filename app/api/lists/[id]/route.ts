import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/src/lib/auth";
import { listOutputSchema } from "@/src/schemas/list";
import AppError from "@/src/errors/appError";
import { modifyList, removeList } from "@/src/services/listService";

export async function DELETE(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    const listId = context.params.id;
    
    await removeList(listId, user.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: Error | any) {
    const status = err instanceof AppError ? err.statusCode : 500;
    return NextResponse.json({ error: err.message }, { status });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    const { name } = await request.json();
    const listId = context.params.id;

    const updatedList = await modifyList(listId, user.id, { name: name.trim() });
    const parsedList = listOutputSchema.parse(updatedList);
    return NextResponse.json(parsedList, { status: 200 });
  } catch (err: Error | any) {
    const status = err instanceof AppError ? err.statusCode : 500;
    return NextResponse.json({ error: err.message }, { status });
  }
}
