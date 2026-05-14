import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default function ResumePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.02em] text-secondary">
            Resumes
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Manage resumes
          </h1>
          <p className="mt-2 text-secondary">
            Keep resume variants ready for different roles.
          </p>
        </div>
        <Button variant="primary">Add Resume</Button>
      </div>

      <EmptyState
        title="No resumes yet"
        description="Add a resume to begin comparing against job postings."
      />

      <Card>
        <CardHeader>
          <CardTitle>Add a resume</CardTitle>
        </CardHeader>
        <form className="space-y-5">
          <label className="block">
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.02em] text-secondary">
              Resume name
            </span>
            <input
              className="input"
              placeholder="Full-Stack Developer Resume"
            />
          </label>
          <label className="block">
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.02em] text-secondary">
              Resume content
            </span>
            <textarea
              className="input min-h-64 resize-y"
              placeholder="Paste your resume content here..."
            />
          </label>
          <div className="rounded-[14px] border border-dashed border-white/15 bg-white/3 p-6 text-center">
            <Upload className="mx-auto mb-3 size-6 text-lime" />
            <p className="text-sm font-medium">PDF upload area</p>
            <p className="mt-1 text-sm text-secondary">
              Reserved for future parsing support.
            </p>
          </div>
          <Button variant="primary">Save Resume</Button>
        </form>
      </Card>
    </div>
  );
}
