"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/jobs/new", label: "New Analysis", icon: Sparkles },
  { href: "/resume", label: "Resumes", icon: FileText },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar({
  open,
  onClose,
  basePath = "",
}: {
  open: boolean;
  onClose: () => void;
  basePath?: string;
}) {
  const pathname = usePathname();

  return (
    <>
      <button
        aria-label="Close sidebar"
        className={cn(
          "fixed inset-0 z-30 cursor-pointer bg-black/60 transition lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-neutral px-4 py-5 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-3 px-2"
          onClick={onClose}
        >
          <span className="grid size-10 place-items-center rounded-[10px] bg-lime text-sm font-bold text-black">
            CM
          </span>
          <span>
            <span className="block font-semibold">CareerMatch AI</span>
            <span className="text-xs text-secondary">Resume intelligence</span>
          </span>
        </Link>

        <nav className="mt-8 space-y-1" aria-label="Dashboard navigation">
          {items.map((item) => {
            const href = `${basePath}${item.href}`;
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-white/8 text-primary"
                    : "text-secondary hover:bg-white/5 hover:text-primary",
                )}
              >
                <item.icon className="size-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
