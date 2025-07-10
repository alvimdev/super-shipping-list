import jwt from "jsonwebtoken";
import AuthError from "@/src/errors/authError";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

type JwtPayload = {
  sub: string; // userId
  email: string;
};

export function generateToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "3d", // Expira em 3 dias
  });
}

export function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    const err = error as jwt.JsonWebTokenError;
    throw new AuthError("Token inválido: " + err.message);
  }
}