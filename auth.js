import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./app/api/db";
//import bcrypt from "bcrypt";
import checkPass from "./app/features/bcompare";

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

        const dbuser = await prisma.User.findFirst({
          where: {
            username: credentials.username,
          },
        });

        const pwMatch = checkPass(credentials.password, dbuser.password);
        //console.log(pwMatch);

        user = { id: "66edb898", username: dbuser.username };

        if (credentials.username == dbuser.username && pwMatch) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    // authorized({ auth, request }) {
    //   const isLoggedIn = !!auth?.user;
    //   const { pathname } = request.nextUrl;
    //   const protectedRoutes = ["/", "/departure"];

    //   console.log(isLoggedIn);

    //   if (isLoggedIn == false && protectedRoutes.includes(pathname)) {
    //     return NextResponse.redirect(new URL("/login", request.url));
    //   }

    //   if (isLoggedIn && pathname.startsWith("/login")) {
    //     return NextResponse.redirect(new URL("/", request.url));
    //   }
    //   return true;
    // },
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
