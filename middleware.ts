// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas públicas para PÁGINAS (acesso anônimo)
const PUBLIC_ROUTES = ["/", "/login", "/cadastro"];

// Rotas públicas de API que não exigem token
const PUBLIC_API_ROUTES = ["/api/user", "/api/login", "/api/docs"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api");

  const isPublicPage = PUBLIC_ROUTES.includes(pathname);
  const isPublicApi = PUBLIC_API_ROUTES.includes(pathname);

  if (isPublicPage || isPublicApi) {
    return NextResponse.next();
  }

  const accessIsAllowed = request.cookies.get("auth_active")?.value?.trim() === "true";

  if (!accessIsAllowed) {
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
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
