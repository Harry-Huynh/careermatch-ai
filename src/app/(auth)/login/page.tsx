import Link from "next/link";
import { LoginForm } from "@/components/forms/auth-forms";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-neutral px-4 py-10 text-primary sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <section className="mx-auto flex w-full max-w-md flex-col justify-center">
        <Link href="/" className="mb-8 flex items-center gap-3 font-semibold">
          <span className="grid size-9 place-items-center rounded-[10px] bg-lime text-sm text-black">
            CM
          </span>
          CareerMatch AI
        </Link>
        <LoginForm />
      </section>
      <section className="hidden items-center justify-center lg:flex">
        <div className="max-w-lg rounded-[14px] border border-white/10 bg-surface p-8">
          <p className="font-mono text-xs uppercase tracking-[0.02em] text-secondary">
            Portfolio-ready workflow
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Turn every job post into a sharper application plan.
          </h1>
          <p className="mt-5 leading-7 text-secondary">
            Save analyses, compare match quality over time, and keep your resume
            improvements connected to real role requirements.
          </p>
        </div>
      </section>
    </main>
  );
}
