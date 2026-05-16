"use server";

import { signIn, signOut } from "@/actions/authConfig";

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
