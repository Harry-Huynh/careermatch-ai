export default function Field({
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
        <span className="mt-2 block text-sm text-red-500">{error}</span>
      ) : null}
    </label>
  );
}
