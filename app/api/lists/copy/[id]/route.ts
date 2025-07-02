import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/src/lib/auth";
import { copyList } from "@/src/services/listService";
import AppError from "@/src/errors/appError";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getAuthenticatedUser();

  const listId = params.id;

  try {
    const newList = await copyList(listId, user.id);
    return NextResponse.json(newList, { status: 201 });
  } catch (err: any) {
    const status = err instanceof AppError ? err.statusCode : 500;
    return NextResponse.json({ error: err.message || "Erro ao copiar lista" }, { status });
  }
}
