import { cookies, headers } from "next/headers";
import { verifyToken } from "@/src/utils/jwt";
import { getUserById } from "@/src/models/user";

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieToken = cookieStore.get("token")?.value;
  const authHeader = headerStore.get("authorization");

  const token = cookieToken || authHeader;

  if (!token) {
    throw new Error("Token não encontrado");
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    throw new Error("Token inválido");
  }

  const user = await getUserById(payload.sub);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
}