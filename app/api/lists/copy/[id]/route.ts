import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/src/lib/auth";
import { copyList } from "@/src/services/listService";
import AppError from "@/src/errors/appError";
import { listOutputSchema } from "@/src/schemas/list";
import { ZodError } from "zod";

export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const user = await getAuthenticatedUser();
  const listId = context.params.id;

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
    const status = err instanceof AppError ? err.statusCode : 500;
    return NextResponse.json({ error: err.message }, { status });
  }
}
