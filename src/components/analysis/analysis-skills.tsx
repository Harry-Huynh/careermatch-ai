import type React from "react";
import { SearchCheck, ShieldAlert, Tags } from "lucide-react";
import { SkillBadge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AnalysisReport } from "@/components/analysis/types";

type AnalysisSkillsProps = {
  report: AnalysisReport;
};

export function AnalysisSkills({ report }: AnalysisSkillsProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-3" aria-label="Skills">
      <SkillGroup
        title="Matched Skills"
        description="Clear overlap with the job requirements."
        icon={<SearchCheck className="size-5 text-emerald-300" />}
        items={report.matchedSkills}
        tone="success"
      />
      <SkillGroup
        title="Missing Skills"
        description="Gaps to address where truthful."
        icon={<ShieldAlert className="size-5 text-amber-200" />}
        items={report.missingSkills}
        tone="warning"
      />
      <SkillGroup
        title="ATS Keywords"
        description="Useful phrasing for recruiter and ATS scanning."
        icon={<Tags className="size-5 text-lime" />}
        items={report.atsKeywords}
        tone="neutral"
      />
    </section>
  );
}

function SkillGroup({
  title,
  description,
  icon,
  items,
  tone,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
  tone: "success" | "warning" | "neutral";
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <SkillBadge key={item} tone={tone}>
            {item}
          </SkillBadge>
        ))}
      </div>
    </Card>
  );
}
