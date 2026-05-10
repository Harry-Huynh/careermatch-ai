"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type FitScorePoint = {
  date: string;
  score: number;
};

type MissingSkillPoint = {
  skill: string;
  count: number;
};

export function DashboardCharts({
  fitScoreHistory,
  missingSkillsChart,
}: {
  fitScoreHistory: FitScorePoint[];
  missingSkillsChart: MissingSkillPoint[];
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Fit score history</CardTitle>
        </CardHeader>
        <div className="h-72 min-w-0">
          {mounted ? (
            <FitHistoryChart data={fitScoreHistory} />
          ) : (
            <ChartSkeleton />
          )}
        </div>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Top missing skills</CardTitle>
        </CardHeader>
        <div className="h-72 min-w-0">
          {mounted ? (
            <MissingSkillsChart data={missingSkillsChart} />
          ) : (
            <ChartSkeleton />
          )}
        </div>
      </Card>
    </div>
  );
}

function FitHistoryChart({ data }: { data: FitScorePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ left: -20, right: 10, top: 10, bottom: 0 }}
      >
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis
          dataKey="date"
          stroke="#9CA3AF"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#9CA3AF"
          tickLine={false}
          axisLine={false}
          domain={[50, 90]}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#B4FF39"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function MissingSkillsChart({ data }: { data: MissingSkillPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ left: -20, right: 10, top: 10, bottom: 0 }}
      >
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis
          dataKey="skill"
          stroke="#9CA3AF"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#9CA3AF"
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="count" fill="#B4FF39" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function ChartSkeleton() {
  return (
    <div className="h-full rounded-[10px] border border-white/10 bg-white/3" />
  );
}

const tooltipStyle = {
  background: "#17191C",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 10,
  color: "#ECEDEE",
};
