import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      let isOnProfile = /^\/[^\/]+$/.test(nextUrl.pathname); // Modify this line

      if (isOnProfile) {
        return isLoggedIn; // Redirect unauthenticated users to login page
      }

      // Allow navigation if user is logged in or if it's not a protected page
      return true;
    },
  },

} satisfies NextAuthConfig;
