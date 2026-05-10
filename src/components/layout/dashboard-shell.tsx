"use client";

import type * as React from "react";
import { useState } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";

export function DashboardShell({
  children,
  basePath = "",
}: {
  children: React.ReactNode;
  basePath?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral text-primary lg:flex">
      <AppSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        basePath={basePath}
      />
      <div className="min-w-0 flex-1">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
