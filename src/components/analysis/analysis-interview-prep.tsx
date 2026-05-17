import type React from "react";
import { Brain, BriefcaseBusiness, MessagesSquare } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AnalysisReport } from "@/components/analysis/types";

type AnalysisInterviewPrepProps = {
  report: AnalysisReport;
};

export function AnalysisInterviewPrep({ report }: AnalysisInterviewPrepProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-3" aria-label="Interview prep">
      <QuestionGroup
        title="Technical Questions"
        description="Practice implementation and systems thinking."
        icon={<Brain className="size-5 text-lime" />}
        questions={report.interviewQuestions.technical}
      />
      <QuestionGroup
        title="Behavioral Questions"
        description="Prepare concrete stories with outcomes."
        icon={<MessagesSquare className="size-5 text-sky-300" />}
        questions={report.interviewQuestions.behavioral}
      />
      <QuestionGroup
        title="Project Explanation Questions"
        description="Use CareerMatch AI as portfolio evidence."
        icon={<BriefcaseBusiness className="size-5 text-emerald-300" />}
        questions={report.interviewQuestions.project}
      />
    </section>
  );
}

function QuestionGroup({
  title,
  description,
  icon,
  questions,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  questions: string[];
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
        {questions.map((question) => (
          <li
            key={question}
            className="rounded-[10px] border border-white/10 bg-white/4 p-4 text-md leading-6  transition hover:bg-white/3"
          >
            {question}
          </li>
        ))}
      </ul>
    </Card>
  );
}
