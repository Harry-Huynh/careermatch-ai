import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FitScoreCard } from "@/components/analysis/fit-score-card";
import { ReportStatusBadge } from "@/components/analysis/report-status-badge";
import type { AnalysisReport } from "@/components/analysis/types";

type AnalysisSummaryProps = {
  report: AnalysisReport;
};

export function AnalysisSummary({ report }: AnalysisSummaryProps) {
  return (
    <section
      className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]"
      aria-label="Analysis summary"
    >
      <FitScoreCard score={report.fitScore} />
      <Card>
        <CardHeader>
          <CardTitle>AI summary</CardTitle>
          <CardDescription>
            High-level read on your resume and the job posting.
          </CardDescription>
        </CardHeader>
        <p className="text-sm leading-6 sm:text-base sm:leading-7">
          {report.summary}
        </p>
        <dl className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-[0.02em] text-secondary">
              Company
            </dt>
            <dd className="mt-1 text-sm font-medium">{report.company}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.02em] text-secondary">
              Status
            </dt>
            <dd className="mt-1">
              <ReportStatusBadge status={report.status} />
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.02em] text-secondary">
              Created
            </dt>
            <dd className="mt-1 text-sm font-medium">{report.createdAt}</dd>
          </div>
        </dl>
      </Card>
    </section>
  );
}
