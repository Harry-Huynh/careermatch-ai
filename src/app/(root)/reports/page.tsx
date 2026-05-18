import Link from "next/link";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SkillBadge } from "@/components/ui/badge";

export default function ReportsPage() {
  const reports: {
    id: string;
    jobTitle: string;
    company: string;
    fitScore: number;
    createdAt: string;
    status: string;
  }[] = [];
  const hasReports = reports.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.02em] text-secondary">
          Reports
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Saved analysis reports
        </h1>
        <p className="mt-2 text-secondary">
          Search previous analyses and filter by fit score or company.
        </p>
      </div>

      <Card>
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px]">
          <label className="relative">
            <span className="sr-only">Search reports</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-secondary" />
            <input
              className="input pl-10!"
              placeholder="Search job title or company"
            />
          </label>
          <select className="input" aria-label="Filter by fit score">
            <option>All fit scores</option>
            <option>80% and above</option>
            <option>70% to 79%</option>
            <option>Below 70%</option>
          </select>
          <select className="input" aria-label="Filter by company">
            <option>All companies</option>
            {reports.map((report) => (
              <option key={report.company}>{report.company}</option>
            ))}
          </select>
        </div>
      </Card>

      {hasReports ? (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-190 text-left text-sm">
              <thead className="border-b border-white/10 text-xs uppercase tracking-[0.02em] text-secondary">
                <tr>
                  <th className="px-5 py-3 font-medium">Job title</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Fit score</th>
                  <th className="px-5 py-3 font-medium">Created date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-white/3">
                    <td className="px-5 py-4 font-medium">{report.jobTitle}</td>
                    <td className="px-5 py-4 text-secondary">
                      {report.company}
                    </td>
                    <td className="px-5 py-4">{report.fitScore}%</td>
                    <td className="px-5 py-4 text-secondary">
                      {report.createdAt}
                    </td>
                    <td className="px-5 py-4">
                      <SkillBadge
                        tone={report.status === "Saved" ? "success" : "neutral"}
                      >
                        {report.status}
                      </SkillBadge>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        className="inline-flex h-9 items-center justify-center rounded-[10px] border border-lime bg-lime px-3 text-sm font-medium text-black transition hover:bg-lime/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/40"
                        href={`/reports/${report.id}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <EmptyState
          title="No reports saved"
          description="Saved job analyses will appear here once reports are generated."
        />
      )}
    </div>
  );
}
