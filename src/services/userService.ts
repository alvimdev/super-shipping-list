import {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "@/src/models/user";
import { registerSchema, updateUserSchema } from "@/src/schemas/user";
import bcrypt from "bcryptjs";
import { zodErrorFormatter, getOrFail } from "../utils/validations";
import ValidationError from "@/src/errors/validationError";

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  const parsedData = registerSchema.safeParse(data);
  zodErrorFormatter(parsedData);

  if (await getUserByEmail(data.email)) {
    throw new ValidationError("Já existe um usuário com este e-mail");
  }

  const hashedPassword = bcrypt.hashSync(data.password, 10);

  return createUser({
    email: data.email,
    password: hashedPassword,
    name: data.name,
  });
}

export async function findUserById(id: string) {
  return getOrFail(() => getUserById(id), "Usuário não encontrado");
}

export async function findUserByEmail(email: string) {
  return getOrFail(() => getUserByEmail(email), "Usuário não encontrado");
}

export async function modifyUser(
  id: string,
  data: Partial<{ name: string; newPassword: string; oldPassword: string }>
) {
  const user = await findUserById(id);

  const filteredData = {
    ...data,
    newPassword: data.newPassword?.trim() || undefined,
    oldPassword: data.oldPassword?.trim() || undefined,
  };

  const parsedData = updateUserSchema.partial().safeParse(filteredData);
  zodErrorFormatter(parsedData);

  if (data.oldPassword) {
    const verifyPassword = bcrypt.compareSync(data.oldPassword, user.password!);
    if (!verifyPassword) {
      throw new ValidationError("Senha incorreta");
    }
  } else {
    throw new ValidationError("Senha antiga é obrigatória");
  }

  const updatedData: any = {};
  if (data.name) updatedData.name = data.name;
  if (data.newPassword) updatedData.password = bcrypt.hashSync(data.newPassword, 10);

  return updateUser(id, updatedData);
}

export async function removeUser(id: string) {
  await findUserById(id);
  return deleteUser(id);
}
