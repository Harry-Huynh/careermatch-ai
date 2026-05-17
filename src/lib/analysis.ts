import { prisma } from "@/lib/prisma";
import { formatTorontoDate } from "@/lib/timezone";

export async function getAnalysisById(userId: string, analysisId: string) {
  const analysis = await prisma.jobAnalysis.findFirst({
    where: {
      id: analysisId,
      userId,
    },
    include: {
      skills: true,
      suggestions: {
        orderBy: {
          order: "asc",
        },
      },
      questions: {
        orderBy: {
          order: "asc",
        },
      },
      roadmapItems: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!analysis) {
    return null;
  }

  return {
    id: analysis.id,
    jobTitle: analysis.jobTitle,
    company: analysis.company,
    fitScore: analysis.fitScore,
    summary: analysis.summary,
    strengths: analysis.strengths,
    weaknesses: analysis.weaknesses,
    createdAt: formatTorontoDate(analysis.createdAt),
    updatedAt: formatTorontoDate(analysis.updatedAt),

    matchedSkills: analysis.skills
      .filter((skill) => skill.type === "MATCHED")
      .map((skill) => skill.name),

    missingSkills: analysis.skills
      .filter((skill) => skill.type === "MISSING")
      .map((skill) => skill.name),

    atsKeywords: analysis.skills
      .filter((skill) => skill.type === "ATS_KEYWORD")
      .map((skill) => skill.name),

    suggestions: analysis.suggestions.map((item) => item.content),

    coverLetterGuidance: analysis.coverLetterGuidance,

    interviewQuestions: {
      technical: analysis.questions
        .filter((question) => question.type === "TECHNICAL")
        .map((question) => question.question),

      behavioral: analysis.questions
        .filter((question) => question.type === "BEHAVIORAL")
        .map((question) => question.question),

      project: analysis.questions
        .filter((question) => question.type === "PROJECT")
        .map((question) => question.question),
    },

    roadmap: {
      quickWins: analysis.roadmapItems
        .filter((item) => item.type === "QUICK_WIN")
        .map((item) => item.content),

      shortTerm: analysis.roadmapItems
        .filter((item) => item.type === "SHORT_TERM")
        .map((item) => item.content),

      mediumTerm: analysis.roadmapItems
        .filter((item) => item.type === "MEDIUM_TERM")
        .map((item) => item.content),
    },
  };
}
