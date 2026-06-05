import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import type { CustomUser } from "@appiks/types";

const ALLOWED_ROLES = ["psychologist"] as const;
const AUTH_URL =
  process.env.NODE_ENV === "production"
    ? "https://auth.appiks.id/login"
    : "http://localhost:3000/login";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function proxy(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.redirect(AUTH_URL);
    }

    const role = (session.user as CustomUser)?.role;
    const hasAccess = role
      ? ALLOWED_ROLES.includes(role as (typeof ALLOWED_ROLES)[number])
      : false;

    if (!hasAccess) {
      const unauthorizedUrl =
        process.env.NODE_ENV === "production"
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
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.webp|.*\\.gif).*)",
  ],
};
