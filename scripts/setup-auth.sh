#!/bin/bash
# Script untuk generate auth.ts di semua Next.js apps (student, school, psychologist, superadmin)
# Apps ini tidak melakukan login sendiri — mereka hanya memvalidasi cookie dari auth.appiks.id

APPS_DIR="/Users/upikaachu/Developer/Works/Novaren/appiks-mono/apps"

generate_auth() {
  local app=$1

cat > "$APPS_DIR/$app/auth.ts" << 'EOF'
import NextAuth from "next-auth";
import type { CustomUser } from "@appiks/types";

/**
 * Auth config untuk app ini — TIDAK memiliki login page sendiri.
 * Hanya membaca session dari cookie .appiks.id yang di-set oleh auth.appiks.id
 */
export const { auth, handlers } = NextAuth({
  providers: [], // No providers — auth handled by apps/auth
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        const s = session as typeof session & { user: CustomUser };
        s.user.id = token.id as string;
        s.user.username = token.username as string;
        s.user.verified = token.verified as boolean;
        s.user.token = token.accessToken as string;
        s.user.expiresIn = token.expiresIn as string;
        s.user.name = token.name as string;
        s.user.role = token.role as string;
        s.user.room = token.room as string;
        s.user.mentor = token.mentor as string;
        s.user.school = token.school as string;
      }
      return session;
    },
  },
  pages: { signIn: process.env.AUTH_URL ?? "http://localhost:3000/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
EOF
  echo "✅ auth.ts created for $app"
}

generate_auth "student"
generate_auth "school"
generate_auth "psychologist"
generate_auth "superadmin"

echo ""
echo "✅ All auth.ts files created!"
