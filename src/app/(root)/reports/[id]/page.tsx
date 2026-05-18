import Link from "next/link";
import { AnalysisHeader } from "@/components/analysis/analysis-header";
import { AnalysisSummary } from "@/components/analysis/analysis-summary";
import { AnalysisOverview } from "@/components/analysis/analysis-overview";
import { AnalysisSkills } from "@/components/analysis/analysis-skills";
import { AnalysisSuggestions } from "@/components/analysis/analysis-suggestions";
import { AnalysisCoverLetter } from "@/components/analysis/analysis-cover-letter";
import { AnalysisInterviewPrep } from "@/components/analysis/analysis-interview-prep";
import { AnalysisRoadmap } from "@/components/analysis/analysis-roadmap";
import { analysisResult } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "skills", label: "Skills" },
  { value: "suggestions", label: "Resume Suggestions" },
  { value: "cover-letter", label: "Cover Letter" },
  { value: "interview-prep", label: "Interview Prep" },
  { value: "roadmap", label: "Roadmap" },
];

type JobAnalysisPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobAnalysisPage({
  params,
}: JobAnalysisPageProps) {
  const { id } = await params;
  const report = id === analysisResult.id ? analysisResult : null;

  if (!report) {
    return (
      <Card className="flex min-h-80 flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Report not found
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-secondary">
          This analysis may have been deleted or you may not have access to it.
        </p>
        <Link
          href="/reports"
          className="mt-6 inline-flex h-11 cursor-pointer items-center justify-center rounded-[10px] border border-lime bg-lime px-4 text-sm font-medium text-black transition hover:bg-lime/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/40"
        >
          Back to Reports
        </Link>
      </Card>
    );
  }

  return (
    <main className="space-y-6">
      <AnalysisHeader report={report} isDemo={false} />
      <AnalysisSummary report={report} />

      <Tabs defaultValue="overview">
        <TabsList aria-label="Analysis report sections">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="overview">
          <AnalysisOverview report={report} />
        </TabsContent>
        <TabsContent value="skills">
          <AnalysisSkills report={report} />
        </TabsContent>
        <TabsContent value="suggestions">
          <AnalysisSuggestions report={report} />
        </TabsContent>
        <TabsContent value="cover-letter">
          <AnalysisCoverLetter report={report} />
        </TabsContent>
        <TabsContent value="interview-prep">
          <AnalysisInterviewPrep report={report} />
        </TabsContent>
        <TabsContent value="roadmap">
          <AnalysisRoadmap report={report} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
