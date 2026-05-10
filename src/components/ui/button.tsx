import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({
  className,
  variant = "secondary",
  type = "button",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "border-lime bg-lime text-black hover:bg-lime/90 focus-visible:ring-lime/40",
    secondary:
      "border-white/10 bg-white/[0.06] text-primary hover:bg-white/[0.1] focus-visible:ring-white/20",
    ghost:
      "border-transparent bg-transparent text-secondary hover:bg-white/[0.06] hover:text-primary focus-visible:ring-white/20",
    danger:
      "border-red-400/20 bg-red-500/10 text-red-200 hover:bg-red-500/15 focus-visible:ring-red-400/30",
  };

  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[10px] border px-4 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
