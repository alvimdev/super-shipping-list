import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_super_secreta"; // Substituir no .env

type JwtPayload = {
  sub: string; // userId
  email: string;
  admin?: boolean; // opcional, se for admin
};

export function generateToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "3d", // Expira em 3 dias
  });
}

export function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    throw new Error("Token inválido");
  }
}