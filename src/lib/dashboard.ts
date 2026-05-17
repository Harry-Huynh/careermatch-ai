import { prisma } from "@/lib/prisma";
import { SkillType } from "@/generated/prisma/enums";
import {
  formatTorontoShortDate,
  getTorontoMonthRangeUtc,
} from "@/lib/timezone";

function formatStatus(status: string) {
  if (status === "SAVED") return "Saved";
  if (status === "DRAFT") return "Draft";
  return "Archived";
}

export async function getDashboardData(userId: string) {
  const { startUtc, endUtc } = getTorontoMonthRangeUtc();

  const [
    totalJobsAnalyzed,
    thisMonthJobs,
    averageFitScore,
    bestMatch,
    recentAnalysesRaw,
    fitScoreHistoryRaw,
    topMissingSkillsRaw,
  ] = await Promise.all([
    prisma.jobAnalysis.count({
      where: {
        userId,
        status: {
          not: "ARCHIVED",
        },
      },
    }),

    prisma.jobAnalysis.count({
      where: {
        userId,
        status: {
          not: "ARCHIVED",
        },
        createdAt: {
          gte: startUtc,
          lt: endUtc,
        },
      },
    }),

    prisma.jobAnalysis.aggregate({
      where: {
        userId,
        status: {
          not: "ARCHIVED",
        },
      },
      _avg: {
        fitScore: true,
      },
    }),

    prisma.jobAnalysis.findFirst({
      where: {
        userId,
        status: {
          not: "ARCHIVED",
        },
      },
      orderBy: {
        fitScore: "desc",
      },
      select: {
        jobTitle: true,
        fitScore: true,
      },
    }),

    prisma.jobAnalysis.findMany({
      where: {
        userId,
        status: {
          not: "ARCHIVED",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        jobTitle: true,
        company: true,
        fitScore: true,
        createdAt: true,
        status: true,
      },
    }),

    prisma.jobAnalysis.findMany({
      where: {
        userId,
        status: {
          not: "ARCHIVED",
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 10,
      select: {
        createdAt: true,
        fitScore: true,
      },
    }),

    prisma.analysisSkill.groupBy({
      by: ["name"],
      where: {
        type: SkillType.MISSING,
        analysis: {
          userId,
          status: {
            not: "ARCHIVED",
          },
        },
      },
      _count: {
        name: true,
      },
      orderBy: {
        _count: {
          name: "desc",
        },
      },
      take: 5,
    }),
  ]);

  const averageScore = Math.round(averageFitScore._avg.fitScore ?? 0);
  const mostCommonMissingSkill = topMissingSkillsRaw[0];

  return {
    hasAnalyses: totalJobsAnalyzed > 0,

    dashboardStats: [
      {
        label: "Total jobs analyzed",
        value: String(totalJobsAnalyzed),
        trend: `+${thisMonthJobs} this month`,
      },
      {
        label: "Average fit score",
        value: `${averageScore}%`,
        trend: "Based on saved analyses",
      },
      {
        label: "Best match",
        value: bestMatch ? `${bestMatch.fitScore}%` : "N/A",
        trend: bestMatch?.jobTitle ?? "No analyses yet",
      },
      {
        label: "Most common missing skill",
        value: mostCommonMissingSkill?.name ?? "N/A",
        trend: mostCommonMissingSkill
          ? `Appears in ${mostCommonMissingSkill._count.name} roles`
          : "No missing skills yet",
      },
    ],

    recentAnalyses: recentAnalysesRaw.map((analysis) => ({
      id: analysis.id,
      jobTitle: analysis.jobTitle,
      company: analysis.company,
      fitScore: analysis.fitScore,
      createdAt: formatTorontoShortDate(analysis.createdAt),
      status: formatStatus(analysis.status),
    })),

    fitScoreHistory: fitScoreHistoryRaw.map((analysis) => ({
      date: formatTorontoShortDate(analysis.createdAt),
      score: analysis.fitScore,
    })),

    missingSkillsChart: topMissingSkillsRaw.map((skill) => ({
      skill: skill.name,
      count: skill._count.name,
    })),
  };
}
