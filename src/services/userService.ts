import { createUser, getUserById, getUserByEmail, updateUser, deleteUser } from "@/src/models/user";
import { registerSchema, updateUserSchema } from "@/src/schemas/user";
import bcrypt from "bcryptjs";

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  const parsedData = registerSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(
      `Campos inválidos:\n- ${parsedData.error.errors
        .map((e) => e.message)
        .join("\n- ")}`
    );
  }

  if (await getUserByEmail(data.email)) {
    throw new Error("Já existe um usuário com este e-mail");
  }

  const hashedPassword = bcrypt.hashSync(data.password, 55);

  return createUser({
    email: data.email,
    password: hashedPassword,
    name: data.name,
  });
}

export async function findUserById(id: string) {
  const user = await getUserById(id);
  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  return user;
}

export async function findUserByEmail(email: string) {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  return user;
}

export async function modifyUser(id: string, data: { name: string,  newPassword: string, oldPassword: string }) {
  const user = await findUserById(id);

  const parsedData = updateUserSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(
      `Campos inválidos:\n- ${parsedData.error.errors
        .map((e) => e.message)
        .join("\n- ")}`
    );
  }

  const verifyPassword = bcrypt.compareSync(data.oldPassword, user.password!);
  if (!verifyPassword) {
    throw new Error("Senha incorreta");
  }

  const hashedPassword = bcrypt.hashSync(data.newPassword, 55);

  return updateUser(id, {
    name: data.name,
    password: hashedPassword,
  });
}

export async function removeUser(id: string) {
  await findUserById(id);

  return deleteUser(id);
}