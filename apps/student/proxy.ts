import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ROLES = ["student"] as const;
const AUTH_URL = process.env.NODE_ENV === "production"
  ? "https://auth.appiks.id/login"
  : "http://localhost:3000/login";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    const session = await auth();

    if (!session) {
      return NextResponse.redirect(AUTH_URL);
    }

    const role = session.user?.role as string;
    const hasAccess = ALLOWED_ROLES.includes(role as (typeof ALLOWED_ROLES)[number]);

    if (!hasAccess) {
      const unauthorizedUrl = process.env.NODE_ENV === "production"
        ? "https://auth.appiks.id/unauthorized"
        : "http://localhost:3000/unauthorized";
      return NextResponse.redirect(unauthorizedUrl);
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(AUTH_URL);
  }
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)",
  ],
};
