import { findUserByEmail } from "@/src/services/userService";
import bcrypt from "bcryptjs";
import { generateToken } from "@/src/utils/jwt";
import AuthError from "@/src/errors/authError";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await findUserByEmail(email);

    const valid = bcrypt.compareSync(password, user.password!);
    if (!valid) {
      throw new AuthError("Credenciais inválidas");
    }

    const token = generateToken({ sub: user.id, email: user.email });

    return Response.json({ token }, { status: 200 });
  } catch (err: Error | any) {
    const status = err instanceof AuthError ? err.statusCode : 500;
    return Response.json({ error: err.message }, { status });
  }
}