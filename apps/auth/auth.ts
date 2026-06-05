import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginAPI, buildUserFromToken, isTokenExpiredByDate, shouldRefreshToken, refreshTokenAPI, sharedCookies } from "@appiks/auth";
import { loginSchema } from "@appiks/types";
import type { CustomUser } from "@appiks/types";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        try {
          const response = await loginAPI(parsed.data);
          if (!response.success || !response.data.token) return null;

          return buildUserFromToken(response.data.token, response.data.expiresIn);
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial login
      if (user) {
        const customUser = user as CustomUser;
        Object.assign(token, {
          id: customUser.id,
          username: customUser.username,
          verified: customUser.verified,
          accessToken: customUser.token,
          expiresIn: customUser.expiresIn,
          name: customUser.name,
          role: customUser.role,
          room: customUser.room,
          mentor: customUser.mentor,
          school: customUser.school,
        });
      }

      // Session update
      if (trigger === "update" && session?.user) {
        Object.assign(token, session.user);
      }

      // Token expired
      if (token.expiresIn && isTokenExpiredByDate(token.expiresIn as string)) {
        throw new Error("Token expired");
      }

      // Token refresh
      if (token.accessToken && token.expiresIn && shouldRefreshToken(token.expiresIn as string)) {
        try {
          const res = await refreshTokenAPI(token.accessToken as string);
          if (res.success) {
            const updated = buildUserFromToken(res.data.token, res.data.expiresIn);
            if (updated) {
              token.accessToken = res.data.token;
              token.expiresIn = res.data.expiresIn;
              token.role = updated.role;
              token.verified = updated.verified;
            }
          }
        } catch {
          throw new Error("Token refresh failed");
        }
      }

      return token;
    },
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
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      
      try {
        const urlObj = new URL(url);
        if (urlObj.hostname === "appiks.id" || urlObj.hostname.endsWith(".appiks.id")) {
          return url;
        }
      } catch {
      }

      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  cookies: sharedCookies,
  pages: { signIn: "/login" },
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
});

export const { GET, POST } = handlers;
