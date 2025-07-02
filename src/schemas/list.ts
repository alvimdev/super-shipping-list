import { z } from "zod";

export const createListSchema = z.object({
  name: z.string().min(1, "O nome da lista é obrigatório")
});

export const updateListSchema = z.object({
  name: z.string().min(1, "O nome da lista é obrigatório")
});

export const listOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date().transform((date) =>
    date.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
  ),
  updatedAt: z.date().transform((date) =>
    date.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
  ),
});

export type CreateListInput = z.infer<typeof createListSchema>;

export type UpdateListInput = z.infer<typeof updateListSchema>;