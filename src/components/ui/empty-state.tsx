import { FileSearch } from "lucide-react";
import { Card } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  href?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  href,
}: EmptyStateProps) {
  return (
    <Card className="flex min-h-56 flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-full border border-white/10 bg-white/6 p-3">
        <FileSearch className="size-6 text-lime" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-secondary">{description}</p>
      {actionLabel && href ? (
        <a
          href={href}
          className="mt-5 inline-flex h-11 cursor-pointer items-center justify-center rounded-[10px] border border-lime bg-lime px-4 text-sm font-medium text-black transition hover:bg-lime/90"
        >
          {actionLabel}
        </a>
      ) : null}
    </Card>
  );
}
