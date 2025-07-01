export function zodErrorFormatter(parsedData: any) {
  if(!parsedData.success) {
    throw new Error(
      `Campos inválidos:\n- ${parsedData.error.errors
        .map((e: any) => e.message)
        .join("\n- ")}`
    );
  }
}

export async function getOrFail<T>(
  fetchFn: () => Promise<T | null>,
  notFoundMessage = "Recurso não encontrado"
): Promise<T> {
  const result = await fetchFn();
  if (!result) throw new Error(notFoundMessage);
  return result;
}