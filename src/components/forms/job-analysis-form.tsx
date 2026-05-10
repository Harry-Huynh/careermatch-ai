"use client";

import type * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const jobSchema = z.object({
  title: z.string().min(2, "Add a job title."),
  company: z.string().min(2, "Add a company name."),
  description: z
    .string()
    .min(80, "Paste at least a few paragraphs from the job posting."),
  resumeId: z.string().min(1, "Choose a resume."),
});

type JobValues = z.infer<typeof jobSchema>;

type ResumeOption = {
  id: string;
  name: string;
};

export function JobAnalysisForm({
  resumeOptions = [],
}: {
  resumeOptions?: ResumeOption[];
}) {
  const hasResumes = resumeOptions.length > 0;
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: { resumeId: resumeOptions[0]?.id ?? "" },
  });

  function onSubmit() {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1200);
  }

  return (
    <Card>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Job title" error={errors.title?.message}>
            <input
              className="input"
              placeholder="Full-Stack Software Engineer"
              {...register("title")}
            />
          </Field>
          <Field label="Company" error={errors.company?.message}>
            <input
              className="input"
              placeholder="Northstar Labs"
              {...register("company")}
            />
          </Field>
        </div>
        <Field label="Resume" error={errors.resumeId?.message}>
          <select
            className="input"
            disabled={!hasResumes}
            {...register("resumeId")}
          >
            {hasResumes ? null : (
              <option value="">Add a resume before analyzing</option>
            )}
            {resumeOptions.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Job description" error={errors.description?.message}>
          <textarea
            className="input min-h-72 resize-y"
            placeholder="Paste the full job posting here..."
            {...register("description")}
          />
        </Field>
        <div className="rounded-[10px] border border-white/10 bg-white/4 p-4 text-sm leading-6 text-secondary">
          CareerMatch AI will compare your selected resume with this job posting
          and generate fit score, skill gaps, ATS keywords, resume suggestions,
          cover letter guidance, interview questions, and a roadmap.
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={loading || !hasResumes}
        >
          {loading ? <LoadingSpinner /> : <Sparkles className="size-4" />}
          Analyze Match
        </Button>
      </form>
    </Card>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-[0.02em] text-secondary">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-2 block text-sm text-amber-100">{error}</span>
      ) : null}
    </label>
  );
}
