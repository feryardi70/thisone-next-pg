import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
//import prisma from "./app/api/db";
import checkPass from "./app/features/bcompare";
import { getUserbyUsername } from "./app/repository/userRepository";
import { randstr } from "./lib/randStr";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 4 },
  jwt: {
    maxAge: 60 * 60 * 4,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials, request) => {
        let user = null;

        const dbuser = await getUserbyUsername(credentials.username);

        if (!dbuser) {
          return null;
        }

        const pwMatch = await checkPass(credentials.password, dbuser.password);

        if (!pwMatch) {
          return null;
        }

        const idStr = randstr();
        user = { id: idStr, username: dbuser.username };
        return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});
