import type React from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { AnalysisReport } from "@/components/analysis/types";

type AnalysisOverviewProps = {
  report: AnalysisReport;
};

export function AnalysisOverview({ report }: AnalysisOverviewProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-2" aria-label="Overview">
      <InsightCard
        title="Strengths"
        icon={<CheckCircle2 className="size-5 text-emerald-300" />}
        items={report.strengths}
      />
      <InsightCard
        title="Weaknesses"
        icon={<AlertTriangle className="size-5 text-amber-200" />}
        items={report.weaknesses}
      />
    </section>
  );
}

function InsightCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-[10px] border border-white/10 bg-white/4 p-4 text-md leading-6"
          >
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
