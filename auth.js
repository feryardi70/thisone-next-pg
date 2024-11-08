import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./app/api/db";

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

        //const username = process.env.AUTH_USERNAME;
        //const password = process.env.AUTH_PASS;

        const dbuser = await prisma.User.findFirst({
          where: {
            username: credentials.username,
          },
        });
        //console.log(dbuser);

        user = { id: "66edb898", username: dbuser.username };

        if (credentials.username == dbuser.username && credentials.password == dbuser.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
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
