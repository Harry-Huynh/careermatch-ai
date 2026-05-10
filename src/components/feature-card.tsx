import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="h-full">
      <Icon className="mb-5 size-6 text-lime" aria-hidden="true" />
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-secondary">{description}</p>
    </Card>
  );
}
