import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z
    .string()
    .min(6)
    .regex(/[A-Z]/, "1 letra maiúscula")
    .regex(/[a-z]/, "1 letra minúscula")
    .regex(/[0-9]/, "1 número")
    .regex(/[!@#$%^&*]/, "1 caractere especial"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateUserSchema = z.object({
  name: z.string().min(2),
  newPassword: z
    .string()
    .min(6)
    .regex(/[A-Z]/, "1 letra maiúscula")
    .regex(/[a-z]/, "1 letra minúscula")
    .regex(/[0-9]/, "1 número")
    .regex(/[!@#$%^&*]/, "1 caractere especial").optional().nullable(),
  oldPassword: z.string().min(6),
});

export const userOutputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2)
});

export const simpleUserSchema = z.object({
  name: z.string().min(2),
  password: z.string().min(6),
});


export type LoginInput = z.infer<typeof loginSchema>;

export type RegisterInput = z.infer<typeof registerSchema>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export type SimpleUserSchema = z.infer<typeof simpleUserSchema>;
