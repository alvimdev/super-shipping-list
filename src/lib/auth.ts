import { cookies, headers } from "next/headers";
import { verifyToken } from "@/src/utils/jwt";
import { getUserById } from "@/src/models/user";
import NotFoundError from "@/src/errors/notFoundError";
import AuthError from "@/src/errors/authError";

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieToken = cookieStore.get("token")?.value;
  const authHeader = headerStore.get("authorization");

  const token = cookieToken || authHeader;

  if (!token) {
    throw new AuthError("Token não encontrado");
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    throw new AuthError("Token inválido");
  }

  const user = await getUserById(payload.sub);

  if (!user) {
    throw new NotFoundError("Usuário não encontrado");
  }

  return user;
}