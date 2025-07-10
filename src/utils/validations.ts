import { z } from "zod";
import NotFoundError from "@/src/errors/notFoundError";
import ValidationError from "@/src/errors/validationError";

export function zodErrorFormatter<I, O>(parsedData: z.SafeParseReturnType<I, O>) {
  if (!parsedData.success) {
    throw new ValidationError(
      `Campos inválidos: ${parsedData.error.errors
        .map((e: z.ZodIssue) => e.message)
        .join(", ")}`
    );
  }
}

export async function getOrFail<T>(
  fetchFn: () => Promise<T | null>,
  notFoundMessage = "Recurso não encontrado"
): Promise<T> {
  const result = await fetchFn();
  if (!result) throw new NotFoundError(notFoundMessage);
  return result;
}