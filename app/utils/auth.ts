import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";

import { db, db as prisma } from "./db";
import { sendVerificationRequest } from "./mail";

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  // session: {
  //   strategy: "jwt",
  // },
  pages: {
    signIn: "/login",
  },

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT as number | undefined,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async (params) => {
        const result = await sendVerificationRequest(params);
        console.log("result = ", result);

        // if success redirect the app
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      // console.log("inside signin");
      return true;
    },
    session: async ({ token, user, session }) => {
      // console.log("inside session", token, user, session);

      // console.log("user = ", user);

      if (user) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.image = user.image;
      }

      console.log("Session = ", session);

      return session;
    },
    async jwt({ token, user }) {
      // console.log("inside jwt", token, user);
      // const dbUser = await db.user.findFirst({
      //   where: {
      //     email: token.email,
      //   },
      // });
      // console.log(dbUser, "dbUser");
      // if (!dbUser) {
      //   if (user) {
      //     token.id = user?.id;
      //   }
      //   return token;
      // }
      // return {
      //   id: dbUser.id,
      //   name: dbUser.name,
      //   email: dbUser.email,
      //   picture: dbUser.image,
      // };
      if (user) token.id = user?.id;
      return token;
    },
  },
};
