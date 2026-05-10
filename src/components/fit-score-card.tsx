import { Card } from "@/components/ui/card";

type FitScoreCardProps = {
  score: number;
  label?: string;
};

export function FitScoreCard({ score, label = "Fit score" }: FitScoreCardProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card className="flex items-center gap-5">
      <div className="relative size-28 shrink-0">
        <svg className="size-28 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="10"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#B4FF39"
            strokeLinecap="round"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-2xl font-semibold">
          {score}%
        </div>
      </div>
      <div>
        <p className="text-sm text-secondary">{label}</p>
        <h3 className="mt-1 text-xl font-semibold">Strong match</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">
          Clear overlap with the role, with a few targeted gaps to close before applying.
        </p>
      </div>
    </Card>
  );
}
