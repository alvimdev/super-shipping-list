import { z } from "zod";

export const createListSchema = z.object({
  name: z.string().min(1, "O nome da lista é obrigatório")
});

export const updateListSchema = z.object({
  name: z.string().min(1, "O nome da lista é obrigatório")
});


export type CreateListInput = z.infer<typeof createListSchema>;

export type UpdateListInput = z.infer<typeof updateListSchema>;