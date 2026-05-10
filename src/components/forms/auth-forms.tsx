"use client";

import type * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const registerSchema = loginSchema
  .extend({
    name: z.string().min(2, "Enter your name."),
    confirmPassword: z.string().min(8, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
  });

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  function onSubmit() {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 900);
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue matching resumes to roles."
    >
      <Button className="w-full" variant="secondary">
        <Mail className="size-4" /> Continue with Google
      </Button>
      <div className="my-5 flex items-center gap-3 text-xs text-secondary">
        <span className="h-px flex-1 bg-white/10" /> or use email{" "}
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Field label="Email" error={errors.email?.message}>
          <input
            className="input"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
        </Field>
        <Field label="Password" error={errors.password?.message}>
          <input
            className="input"
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />
        </Field>
        <div className="rounded-[10px] border border-white/10 bg-white/4 px-3 py-2 text-sm text-secondary">
          Error messages will appear here when authentication is connected.
        </div>
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : null}
          Sign in
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-secondary">
        New here?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:text-lime"
        >
          Create an account
        </Link>
      </p>
    </AuthCard>
  );
}

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  function onSubmit() {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 900);
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Use email or Google to start saving analyses."
    >
      <Button className="w-full" variant="secondary">
        <Mail className="size-4" /> Continue with Google
      </Button>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Field label="Name" error={errors.name?.message}>
          <input className="input" autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            className="input"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
        </Field>
        <Field label="Password" error={errors.password?.message}>
          <input
            className="input"
            type="password"
            autoComplete="new-password"
            {...register("password")}
          />
        </Field>
        <Field label="Confirm password" error={errors.confirmPassword?.message}>
          <input
            className="input"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
        </Field>
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : null}
          Create account
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-secondary">
        Already registered?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:text-lime"
        >
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}

function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="w-full max-w-md">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-secondary">{subtitle}</p>
      <div className="mt-7">{children}</div>
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
