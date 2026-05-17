import { MailCheck } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AnalysisReport } from "@/components/analysis/types";

type AnalysisCoverLetterProps = {
  report: AnalysisReport;
};

export function AnalysisCoverLetter({ report }: AnalysisCoverLetterProps) {
  return (
    <section className="space-y-4" aria-label="Cover letter guidance">
      <Card className="border-lime/20 bg-lime/4">
        <p className="text-sm leading-6 text-lime">
          Use this guidance to personalize your cover letter instead of copying
          it directly.
        </p>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MailCheck className="size-5 text-lime" aria-hidden="true" />
            Cover Letter
          </CardTitle>
          <CardDescription className="text-primary!">
            Talking points that connect your experience to the job posting.
          </CardDescription>
        </CardHeader>
        <div className="grid gap-3 md:grid-cols-3">
          {report.coverLetterGuidance.map((guidance) => (
            <article
              key={guidance}
              className="rounded-[10px] border border-white/10 bg-white/4 p-4 transition hover:bg-white/3"
            >
              <p className="text-md leading-6">{guidance}</p>
            </article>
          ))}
        </div>
      </Card>
    </section>
  );
}
