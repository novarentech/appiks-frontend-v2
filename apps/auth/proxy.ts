import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { UserRole, CustomUser } from "@appiks/types";
import { ROLE_REDIRECT_MAP } from "@appiks/types";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes — always allow
  if (["/login", "/unauthorized"].some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  // /logout — allow but handle via page
  if (pathname.startsWith("/logout")) {
    return NextResponse.next();
  }

  // For any other route, check session
  try {
    const session = await auth();

    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If authenticated user visits root, redirect based on role
    if (pathname === "/") {
      const role = (session.user as CustomUser)?.role;
      const redirectUrl = (role && ROLE_REDIRECT_MAP[role]) ?? "/login";
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)"],
};
