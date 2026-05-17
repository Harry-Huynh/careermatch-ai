import { prisma } from "@/lib/prisma";
import { formatTorontoDate } from "@/lib/timezone";

type GetReportsOptions = {
  userId: string;
  query?: string;
  company?: string;
  minFitScore?: number;
  maxFitScore?: number;
};

function formatStatus(status: string) {
  if (status === "SAVED") return "Saved";
  if (status === "DRAFT") return "Draft";
  return "Archived";
}

export async function getReports({
  userId,
  query,
  company,
  minFitScore,
  maxFitScore,
}: GetReportsOptions) {
  const reports = await prisma.jobAnalysis.findMany({
    where: {
      userId,
      status: {
        not: "ARCHIVED",
      },
      OR: query
        ? [
            {
              jobTitle: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              company: {
                contains: query,
                mode: "insensitive",
              },
            },
          ]
        : undefined,
      company: company
        ? {
            contains: company,
            mode: "insensitive",
          }
        : undefined,
      fitScore: {
        gte: minFitScore,
        lte: maxFitScore,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      jobTitle: true,
      company: true,
      fitScore: true,
      createdAt: true,
      status: true,
    },
  });

  return reports.map((report) => ({
    id: report.id,
    jobTitle: report.jobTitle,
    company: report.company,
    fitScore: report.fitScore,
    createdAt: formatTorontoDate(report.createdAt),
    status: formatStatus(report.status),
  }));
}
