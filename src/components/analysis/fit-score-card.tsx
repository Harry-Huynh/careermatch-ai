import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFitScoreLabel } from "@/components/analysis/types";

type FitScoreCardProps = {
  score: number;
};

export function FitScoreCard({ score }: FitScoreCardProps) {
  const label = getFitScoreLabel(score);

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-lime/50" />
      <CardHeader>
        <CardTitle>Fit score</CardTitle>
        <CardDescription>Resume alignment with this role</CardDescription>
      </CardHeader>
      <div className="flex items-end gap-3">
        <p className="text-6xl font-semibold tracking-tight text-lime">
          {score}
          <span className="text-3xl">%</span>
        </p>
        <p className="pb-2 text-sm font-medium text-primary">{label}</p>
      </div>
      <div
        className="mt-5 h-3 overflow-hidden rounded-full bg-white/6"
        aria-label={`Fit score ${score} percent`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
      >
        <div
          className="h-full rounded-full bg-lime"
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="mt-4 text-sm leading-6">
        {label} based on role keywords, project overlap, and how clearly the
        resume demonstrates required experience.
      </p>
    </Card>
  );
}
