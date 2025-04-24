import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/login",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt, which is only compatible with Node.js,
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProfilePage = nextUrl.pathname.startsWith("/profile");
      if (isOnProfilePage) {
        // If false, redirect unauthenticated users to the login page
        return isLoggedIn;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/profile", nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
