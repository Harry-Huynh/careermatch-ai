import type * as React from "react";
import { cn } from "@/lib/utils";

type SkillBadgeProps = {
  children: React.ReactNode;
  tone?: "success" | "warning" | "neutral";
};

export function SkillBadge({ children, tone = "neutral" }: SkillBadgeProps) {
  const tones = {
    success: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
    warning: "border-amber-300/25 bg-amber-300/10 text-amber-100",
    neutral: "border-white/10 bg-white/[0.06] text-primary",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
