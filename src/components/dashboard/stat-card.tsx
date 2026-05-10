import { Card } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: string;
  trend: string;
};

export function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-[0.02em] text-secondary">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-sm text-secondary">{trend}</p>
    </Card>
  );
}
