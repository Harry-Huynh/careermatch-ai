import Link from "next/link";
import { RegisterForm } from "@/components/forms/auth-forms";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen bg-neutral px-4 py-10 text-primary sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <section className="mx-auto flex w-full max-w-md flex-col justify-center">
        <Link href="/" className="mb-8 flex items-center gap-3 font-semibold">
          <span className="grid size-9 place-items-center rounded-[10px] bg-lime text-sm text-black">CM</span>
          CareerMatch AI
        </Link>
        <RegisterForm />
      </section>
      <section className="hidden items-center justify-center lg:flex">
        <div className="max-w-lg rounded-[14px] border border-white/10 bg-surface p-8">
          <p className="font-mono text-xs uppercase tracking-[0.02em] text-secondary">Better applications, faster</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Build a reusable job search command center.</h1>
          <p className="mt-5 leading-7 text-secondary">
            Start with mock UI today, then connect authentication, resumes, and AI analysis when the backend is ready.
          </p>
        </div>
      </section>
    </main>
  );
}
