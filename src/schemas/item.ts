import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().min(1, "O nome do item é obrigatório"),
  quantity: z.number().min(1, "A quantidade deve ser pelo menos 1"),
});

export const updateItemSchema = z.object({
  name: z.string().min(1, "O nome do item é obrigatório").optional(),
  quantity: z.number().min(1, "A quantidade deve ser pelo menos 1").optional(),
});

export const itemOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  completed: z.boolean(),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;

export type UpdateItemInput = z.infer<typeof updateItemSchema>;