// src/auth.ts

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  providers: [
    Google,

    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = String(credentials?.email ?? "")
          .toLowerCase()
          .trim();

        const password = String(credentials?.password ?? "");

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.passwordHash || user.isBlocked) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.passwordHash,
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false;

      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (existingUser?.isBlocked) return false;

      if (account?.provider === "google") {
        const googleProfile = profile as {
          email?: string;
          email_verified?: boolean;
        };

        const isEmailVerified = googleProfile.email_verified === true;

        return isEmailVerified;
      }

      return true;
    },

    async jwt({ token, user }) {
      const email = user?.email;

      if (!email) return token;

      const dbUser = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          role: true,
          dailyAnalysisLimit: true,
        },
      });

      if (!dbUser) return token;

      token.id = dbUser.id;
      token.role = dbUser.role;
      token.dailyAnalysisLimit = dbUser.dailyAnalysisLimit;

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "USER" | "ADMIN";
        session.user.dailyAnalysisLimit = token.dailyAnalysisLimit as number;
      }

      return session;
    },
  },

  events: {
    async signIn({ user, account }) {
      if (!user.id) return;

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          provider: account?.provider === "google" ? "GOOGLE" : "CREDENTIALS",
          lastLoginAt: new Date(),
        },
      });
    },
  },
});
