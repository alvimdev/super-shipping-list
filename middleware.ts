import { NextResponse } from "next/server";
import { verifyToken } from "@/src/utils/jwt";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/cadastro"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token || !verifyToken(token)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
