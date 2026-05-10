import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillBadge } from "@/components/ui/badge";

export type AnalysisListItem = {
  id: string;
  jobTitle: string;
  company: string;
  fitScore: number;
  createdAt: string;
  status: string;
};

export function RecentAnalysesTable({
  analyses,
  basePath = "",
}: {
  analyses: AnalysisListItem[];
  basePath?: string;
}) {
  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="mb-0 p-5">
        <CardTitle>Recent analyses</CardTitle>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full min-w-170 text-left text-sm">
          <thead className="border-y border-white/10 text-xs uppercase tracking-[0.02em] text-secondary">
            <tr>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Company</th>
              <th className="px-5 py-3 font-medium">Fit</th>
              <th className="px-5 py-3 font-medium">Created</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {analyses.map((analysis) => (
              <tr key={analysis.id} className="hover:bg-white/3">
                <td className="px-5 py-4 font-medium">{analysis.jobTitle}</td>
                <td className="px-5 py-4 text-secondary">{analysis.company}</td>
                <td className="px-5 py-4">{analysis.fitScore}%</td>
                <td className="px-5 py-4 text-secondary">
                  {analysis.createdAt}
                </td>
                <td className="px-5 py-4">
                  <SkillBadge
                    tone={analysis.status === "Saved" ? "success" : "neutral"}
                  >
                    {analysis.status}
                  </SkillBadge>
                </td>
                <td className="px-5 py-4">
                  <Link
                    className="font-medium text-primary hover:text-lime"
                    href={`${basePath}/jobs/${analysis.id}`}
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
  );
}
