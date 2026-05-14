import type * as React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/actions/authConfig";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return <div>{children}</div>;
}
