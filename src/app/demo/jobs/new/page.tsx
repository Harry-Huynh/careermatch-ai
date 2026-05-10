import { resumes } from "@/lib/mock-data";
import { JobAnalysisForm } from "@/components/forms/job-analysis-form";

export default function DemoNewJobPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.02em] text-secondary">Demo analysis</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Analyze a New Job</h1>
        <p className="mt-2 max-w-2xl text-secondary">
          Demo mode includes sample resumes so the form looks populated before backend integration.
        </p>
      </div>
      <JobAnalysisForm resumeOptions={resumes} />
    </div>
  );
}
