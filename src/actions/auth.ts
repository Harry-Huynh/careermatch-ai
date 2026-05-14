"use server";

import { signIn, signOut } from "@/actions/authConfig";
import { AuthError } from "next-auth";

export async function loginWithGoogle() {
  await signIn("google", {
    redirectTo: "/dashboard",
  });
}

export async function logout() {
  await signOut({
    redirectTo: "/",
  });
}

export async function loginWithCredentials(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Invalid email or password.",
      };
    }

    throw error;
  }
}
