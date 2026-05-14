"use client";

import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";

export function TopNavbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-neutral/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="size-10 px-0 lg:hidden"
            aria-label="Open sidebar"
            onClick={onMenuClick}
          >
            <Menu className="size-5" />
          </Button>
          <div>
            <p className="text-sm font-semibold">CareerMatch AI</p>
            <p className="hidden text-xs text-secondary sm:block">
              Application readiness workspace
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/6 text-xs font-semibold">
            HH
          </div>
          <Button variant="ghost" className="h-10 px-3" onClick={logout}>
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
