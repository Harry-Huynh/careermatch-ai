import { cn } from "@/lib/utils";

type ReportStatusBadgeProps = {
  status: string;
  className?: string;
};

export function ReportStatusBadge({
  status,
  className,
}: ReportStatusBadgeProps) {
  const saved = status.toLowerCase() === "saved";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        saved
          ? "border-lime/30 bg-lime/10 text-lime"
          : "border-white/10 bg-white/6 text-secondary",
        className,
      )}
    >
      {status}
    </span>
  );
}
