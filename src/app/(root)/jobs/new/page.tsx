import { JobAnalysisForm } from "@/components/forms/job-analysis-form";

export default function NewJobPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.02em] text-secondary">New analysis</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Analyze a New Job</h1>
        <p className="mt-2 max-w-2xl text-secondary">
          Paste a job posting, choose the resume version you want to test, and generate an AI match report.
        </p>
      </div>
      <JobAnalysisForm />
    </div>
  );
}
