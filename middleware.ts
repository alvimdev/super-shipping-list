import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/cadastro"];
const PUBLIC_API_ROUTES = ["/api/user", "/api/login", "/api/docs", "/api/ping"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api");

  const isPublicPage = PUBLIC_ROUTES.includes(pathname);
  const isPublicApi = PUBLIC_API_ROUTES.includes(pathname);

  if (isPublicPage || isPublicApi) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get("auth_active")?.value?.trim();
  const accessIsAllowed = authCookie === "true";

  if (!accessIsAllowed) {
    const response = !isApiRoute
      ? NextResponse.redirect(new URL("/login", request.url))
      : new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });

    clearAuthCookies(response);
    return response;
  }

  return NextResponse.next();
}

function clearAuthCookies(response: NextResponse) {
  response.cookies.set("auth_active", "false", {
    maxAge: 0,
    path: "/",
    httpOnly: false,
  });
  response.cookies.set("token", "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
