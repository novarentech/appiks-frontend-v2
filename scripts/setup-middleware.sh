#!/bin/bash
# Script untuk generate middleware.ts di semua Next.js apps

APPS_DIR="/Users/upikaachu/Developer/Works/Novaren/appiks-mono/apps"

generate_middleware() {
  local app=$1
  local roles=$2
  local port=$3

cat > "$APPS_DIR/$app/middleware.ts" << EOF
import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ROLES = [$roles] as const;
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
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\\\.png|.*\\\\.jpg|.*\\\\.svg).*)",
  ],
};
EOF
  echo "✅ middleware.ts created for $app"
}

generate_middleware "student"      '"student"'                                       3001
generate_middleware "school"       '"admin", "teacher", "counselor", "head_teacher"' 3002
generate_middleware "psychologist" '"psychologist"'                                  3003
generate_middleware "superadmin"   '"super"'                                         3004

echo ""
echo "✅ All middleware.ts files created!"
