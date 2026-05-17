import type React from "react";
import { CalendarClock, Rocket, Sparkles } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AnalysisReport } from "@/components/analysis/types";

type AnalysisRoadmapProps = {
  report: AnalysisReport;
};

export function AnalysisRoadmap({ report }: AnalysisRoadmapProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-3" aria-label="Roadmap">
      <RoadmapColumn
        title="Quick Wins"
        description="Resume edits you can make first."
        icon={<Sparkles className="size-5 text-lime" />}
        items={report.roadmap.quickWins}
      />
      <RoadmapColumn
        title="Short-Term Improvements"
        description="Small portfolio upgrades with visible payoff."
        icon={<Rocket className="size-5 text-emerald-300" />}
        items={report.roadmap.shortTerm}
      />
      <RoadmapColumn
        title="Medium-Term Improvements"
        description="Credibility builders for future applications."
        icon={<CalendarClock className="size-5 text-sky-300" />}
        items={report.roadmap.mediumTerm}
      />
    </section>
  );
}

function RoadmapColumn({
  title,
  description,
  icon,
  items,
}: {
  title: string;
  description: string;
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
        <CardDescription className="text-primary!">
          {description}
        </CardDescription>
      </CardHeader>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-md leading-6">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-lime" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
