import Link from "next/link";
import { Plus } from "lucide-react";
import {
  dashboardStats,
  fitScoreHistory,
  missingSkillsChart,
  recentAnalyses,
} from "@/lib/mock-data";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { RecentAnalysesTable } from "@/components/dashboard/recent-analyses-table";
import { StatCard } from "@/components/dashboard/stat-card";

export default function DemoDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.02em] text-secondary">Demo dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Welcome back, Harry</h1>
          <p className="mt-2 text-secondary">Mock activity for screenshots and product walkthroughs.</p>
        </div>
        <Link className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-lime px-4 text-sm font-medium text-black hover:bg-lime/90" href="/demo/jobs/new">
          <Plus className="size-4" /> Analyze New Job
        </Link>
      </div>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </section>
      <DashboardCharts
        fitScoreHistory={fitScoreHistory}
        missingSkillsChart={missingSkillsChart}
      />
      <RecentAnalysesTable analyses={recentAnalyses} basePath="/demo" />
    </div>
  );
}
