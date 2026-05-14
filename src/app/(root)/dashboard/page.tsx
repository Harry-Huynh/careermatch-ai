import Link from "next/link";
import { Plus } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.02em] text-secondary">Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Welcome back, Harry</h1>
          <p className="mt-2 text-secondary">Track match quality and find the clearest next resume improvements.</p>
        </div>
        <Link className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-lime px-4 text-sm font-medium text-black hover:bg-lime/90" href="/jobs/new">
          <Plus className="size-4" /> Analyze New Job
        </Link>
      </div>

      <EmptyState
        title="No analyses yet"
        description="Paste a job posting and compare it against your resume to generate your first report."
        actionLabel="Analyze New Job"
        href="/jobs/new"
      />
    </div>
  );
}
