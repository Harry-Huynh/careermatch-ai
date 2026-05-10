"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, FileCheck2, Plus } from "lucide-react";
import { FitScoreCard } from "@/components/fit-score-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

const tabs = [
  "Overview",
  "Skills",
  "Resume Suggestions",
  "Cover Letter",
  "Interview Prep",
  "Roadmap",
];

export type AnalysisReport = {
  id: string;
  jobTitle: string;
  company: string;
  fitScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  matchedSkills: string[];
  missingSkills: string[];
  atsKeywords: string[];
  suggestions: string[];
  coverLetterGuidance: string[];
  interviewQuestions: {
    technical: string[];
    behavioral: string[];
    project: string[];
  };
  roadmap: {
    quickWins: string[];
    shortTerm: string[];
    mediumTerm: string[];
  };
};

export function AnalysisResult({
  result,
  basePath = "",
}: {
  result?: AnalysisReport;
  basePath?: string;
}) {
  const [active, setActive] = useState(tabs[0]);

  if (!result) {
    return (
      <EmptyState
        title="Analysis report not loaded"
        description="Connect this page to your backend and pass a saved analysis result into the report UI."
        actionLabel="Analyze a job"
        href="/jobs/new"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.02em] text-secondary">
            Analysis report
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {result.jobTitle}
          </h1>
          <p className="mt-2 text-secondary">{result.company}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary">
            <FileCheck2 className="size-4" /> Save report
          </Button>
          <Button variant="secondary">
            <Download className="size-4" /> Export as PDF
          </Button>
          <Link
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-lime bg-lime px-4 text-sm font-medium text-black hover:bg-lime/90"
            href={`${basePath}/jobs/new`}
          >
            <Plus className="size-4" /> Analyze another job
          </Link>
        </div>
      </div>

      <div
        className="flex gap-2 overflow-x-auto border-b border-white/10 pb-2"
        role="tablist"
        aria-label="Analysis tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`shrink-0 cursor-pointer rounded-[10px] px-4 py-2 text-sm font-medium transition ${
              active === tab
                ? "bg-white/8 text-primary"
                : "text-secondary hover:bg-white/5 hover:text-primary"
            }`}
            onClick={() => setActive(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {active === "Overview" ? <Overview result={result} /> : null}
      {active === "Skills" ? <Skills result={result} /> : null}
      {active === "Resume Suggestions" ? (
        <ListCard
          title="Specific resume improvements"
          items={result.suggestions}
        />
      ) : null}
      {active === "Cover Letter" ? (
        <ListCard
          title="Cover letter guidance"
          items={result.coverLetterGuidance}
        />
      ) : null}
      {active === "Interview Prep" ? <InterviewPrep result={result} /> : null}
      {active === "Roadmap" ? <Roadmap result={result} /> : null}
    </div>
  );
}

function Overview({ result }: { result: AnalysisReport }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
      <FitScoreCard score={result.fitScore} />
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <p className="text-sm leading-6 text-secondary">{result.summary}</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <ListBlock title="Strengths" items={result.strengths} />
          <ListBlock title="Weaknesses" items={result.weaknesses} />
        </div>
      </Card>
    </div>
  );
}

function Skills({ result }: { result: AnalysisReport }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <BadgeCard
        title="Matched skills"
        tone="success"
        items={result.matchedSkills}
      />
      <BadgeCard
        title="Missing skills"
        tone="warning"
        items={result.missingSkills}
      />
      <BadgeCard
        title="ATS keywords"
        tone="neutral"
        items={result.atsKeywords}
      />
    </div>
  );
}

function BadgeCard({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "success" | "warning" | "neutral";
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <ListBlock items={items} />
    </Card>
  );
}

function ListBlock({ title, items }: { title?: string; items: string[] }) {
  return (
    <div>
      {title ? <h3 className="mb-3 font-semibold">{title}</h3> : null}
      <ul className="space-y-3 text-sm leading-6 text-secondary">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-[10px] border border-white/10 bg-white/4 p-3"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function InterviewPrep({ result }: { result: AnalysisReport }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <ListCard
        title="Technical questions"
        items={result.interviewQuestions.technical}
      />
      <ListCard
        title="Behavioral questions"
        items={result.interviewQuestions.behavioral}
      />
      <ListCard
        title="Project explanation questions"
        items={result.interviewQuestions.project}
      />
    </div>
  );
}

function Roadmap({ result }: { result: AnalysisReport }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <ListCard title="Quick wins" items={result.roadmap.quickWins} />
      <ListCard
        title="Short-term improvements"
        items={result.roadmap.shortTerm}
      />
      <ListCard
        title="Medium-term improvements"
        items={result.roadmap.mediumTerm}
      />
    </div>
  );
}
