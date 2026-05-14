import type { DefaultSession } from "next-auth";

type UserRole = "USER" | "ADMIN";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      dailyAnalysisLimit: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    dailyAnalysisLimit: number;
  }
}
