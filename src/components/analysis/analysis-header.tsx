import Link from "next/link";
import { ArrowLeft, Download, FileCheck2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReportStatusBadge } from "@/components/analysis/report-status-badge";
import type { AnalysisReport } from "@/components/analysis/types";

type AnalysisHeaderProps = {
  report: AnalysisReport;
  isDemo: boolean;
};

export function AnalysisHeader({
  report,
  isDemo = false,
}: AnalysisHeaderProps) {
  return (
    <header className="space-y-5">
      <Link
        href={isDemo ? "/demo/reports" : "/reports"}
        className="inline-flex items-center gap-2 text-sm font-medium text-secondary transition hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Reports
      </Link>
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.02em] text-secondary">
              Analysis Report
            </p>
            <ReportStatusBadge status={report.status} />
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {report.jobTitle}
          </h1>
          <p className="mt-2 text-sm text-secondary sm:text-base">
            {report.company} - Created {report.createdAt}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button variant="secondary" aria-label="Save Report">
            <FileCheck2 className="size-4" aria-hidden="true" />
            Save Report
          </Button>
          <Button variant="secondary" aria-label="Export as PDF">
            <Download className="size-4" aria-hidden="true" />
            Export as PDF
          </Button>
          <Link
            href={isDemo ? "/demo/jobs/new" : "/jobs/new"}
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-lime bg-lime px-4 text-sm font-medium text-black transition hover:bg-lime/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/40"
          >
            <Plus className="size-4" aria-hidden="true" />
            Analyze Another Job
          </Link>
        </div>
      </div>
    </header>
  );
}
