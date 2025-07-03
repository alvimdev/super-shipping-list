// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/src/utils/jwt";

// Rotas públicas para PÁGINAS (acesso anônimo)
const PUBLIC_ROUTES = ["/", "/login", "/cadastro"];

// Rotas públicas de API que não exigem token
const PUBLIC_API_ROUTES = ["/api/user", "/api/login", "/api/docs"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api");

  const isPublicPage = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  const isPublicApi = PUBLIC_API_ROUTES.some((route) => pathname.startsWith(route));

  if (isPublicPage || isPublicApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token || !verifyToken(token)) {
    if (!isApiRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return new NextResponse(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
