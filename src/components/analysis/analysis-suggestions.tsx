import { ListChecks } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AnalysisReport } from "@/components/analysis/types";

type AnalysisSuggestionsProps = {
  report: AnalysisReport;
};

export function AnalysisSuggestions({ report }: AnalysisSuggestionsProps) {
  return (
    <section aria-label="Resume suggestions">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="size-5 text-lime" aria-hidden="true" />
            Resume Suggestions
          </CardTitle>
          <CardDescription className="text-primary!">
            Specific changes to make the resume read closer to this role.
          </CardDescription>
        </CardHeader>
        <ol className="grid gap-3 md:grid-cols-2">
          {report.suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className="flex gap-4 rounded-[10px] border border-white/10 bg-white/4 p-4 transition hover:bg-white/3"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lime text-sm font-semibold text-black">
                {index + 1}
              </span>
              <p className="text-md leading-6">{suggestion}</p>
            </li>
          ))}
        </ol>
      </Card>
    </section>
  );
}
