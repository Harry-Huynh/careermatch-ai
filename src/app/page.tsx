import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  FileSearch,
  FileText,
  ListChecks,
  Map,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import { FeatureCard } from "@/components/feature-card";

const features = [
  {
    title: "Resume Analysis",
    description:
      "Parse your resume into clear strengths, gaps, and role-ready positioning.",
    icon: FileText,
  },
  {
    title: "Job Posting Extraction",
    description:
      "Identify required skills, seniority signals, ATS terms, and hidden expectations.",
    icon: FileSearch,
  },
  {
    title: "AI Fit Score",
    description:
      "See an instant match score with concise reasoning you can act on.",
    icon: BarChart3,
  },
  {
    title: "ATS Keyword Suggestions",
    description:
      "Find high-value keywords to add without stuffing or weakening your voice.",
    icon: ListChecks,
  },
  {
    title: "Interview Preparation",
    description:
      "Generate technical, behavioral, and project questions tailored to the role.",
    icon: MessageSquareText,
  },
  {
    title: "Skill Gap Roadmap",
    description:
      "Turn missing skills into quick wins and practical learning milestones.",
    icon: Map,
  },
];

const steps = [
  "Add your resume",
  "Paste a job posting",
  "Generate AI analysis",
  "Improve your application",
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-neutral text-primary">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <span className="grid size-9 place-items-center rounded-[10px] bg-lime text-sm text-black">
              CM
            </span>
            CareerMatch AI
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              className="rounded-[10px] px-3 py-2 text-sm text-secondary hover:text-primary"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="cursor-pointer rounded-[10px] bg-lime px-4 py-2 text-sm font-medium text-black hover:bg-lime/90"
              href="/register"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.02em] text-secondary">
            AI resume and job posting analyzer
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-normal sm:text-6xl">
            Analyze Your Resume Against Any Job Posting
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-secondary">
            CareerMatch AI compares your resume to real job descriptions,
            highlights your fit, surfaces missing skills, and turns every
            application into a focused improvement plan.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex h-12 cursor-pointer items-center justify-center rounded-[10px] bg-lime px-5 text-sm font-semibold text-black hover:bg-lime/90"
              href="/register"
            >
              Get Started
            </Link>
            <Link
              className="inline-flex h-12 cursor-pointer items-center justify-center rounded-[10px] border border-white/10 bg-white/6 px-5 text-sm font-medium text-primary hover:bg-white/10"
              href="/demo/dashboard"
            >
              View Demo
            </Link>
          </div>
        </div>
        <div className="rounded-[14px] border border-white/10 bg-surface p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-sm font-semibold">Northstar Labs</p>
              <p className="text-xs text-secondary">
                Full-Stack Software Engineer
              </p>
            </div>
            <span className="rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-sm font-medium text-lime">
              78% fit
            </span>
          </div>
          <div className="mt-5 space-y-3">
            {["React", "TypeScript", "Node.js", "PostgreSQL"].map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-3 rounded-[10px] border border-white/10 bg-white/4 p-3"
              >
                <CheckCircle2 className="size-5 text-lime" />
                <span className="text-sm">{skill}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[10px] border border-white/10 bg-white/4 p-4">
            <Sparkles className="mb-3 size-5 text-lime" />
            <p className="text-sm leading-6 text-secondary">
              Add Docker, CI/CD, AWS, and testing evidence to improve ATS
              alignment before applying.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-[14px] border border-white/10 bg-surface p-5"
            >
              <span className="grid size-9 place-items-center rounded-[10px] bg-white/6 text-sm font-semibold text-lime">
                {index + 1}
              </span>
              <h3 className="mt-5 font-semibold">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-secondary">
        CareerMatch AI. Built for focused, evidence-based job applications.
      </footer>
    </main>
  );
}
