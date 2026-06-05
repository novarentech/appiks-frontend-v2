import NextAuth from "next-auth";
import type { CustomUser } from "@appiks/types";
import { sharedCookies } from "@appiks/auth";

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
        s.user.role = token.role as CustomUser["role"];
        s.user.room = token.room as string;
        s.user.mentor = token.mentor as string;
        s.user.school = token.school as string;
      }
      return session;
    },
  },
  pages: { signIn: process.env.AUTH_URL ?? "http://localhost:3000/login" },
  cookies: sharedCookies,
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});