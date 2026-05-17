"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/actions/authConfig";
import {
  UsageAction,
  SkillType,
  QuestionType,
  RoadmapType,
} from "@/generated/prisma/enums";
import { getTorontoDayRangeUtc } from "@/lib/timezone";

type CreateAnalysisInput = {
  resumeId: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
};

export async function createAnalysis(input: CreateAnalysisInput) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in.");
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      isBlocked: true,
      dailyAnalysisLimit: true,
    },
  });

  if (!user || user.isBlocked) {
    throw new Error("Your account cannot create analyses.");
  }

  const { startUtc, endUtc } = getTorontoDayRangeUtc();

  const todayUsageCount = await prisma.usageLog.count({
    where: {
      userId,
      action: UsageAction.JOB_ANALYSIS,
      createdAt: {
        gte: startUtc,
        lte: endUtc,
      },
    },
  });

  if (todayUsageCount >= user.dailyAnalysisLimit) {
    throw new Error("You have reached your daily analysis limit.");
  }

  const resume = await prisma.resume.findFirst({
    where: {
      id: input.resumeId,
      userId,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const aiResult = {
    fitScore: 78,
    summary:
      "Your resume is a strong match for this role, especially across React, TypeScript, Node.js, and PostgreSQL.",
    strengths: [
      "Strong React and TypeScript alignment.",
      "Relevant backend API experience.",
      "Good database experience with PostgreSQL.",
    ],
    weaknesses: [
      "Docker is not clearly shown.",
      "CI/CD experience should be more visible.",
      "Testing tools are not explicit enough.",
    ],
    matchedSkills: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
    ],
    missingSkills: ["Docker", "CI/CD", "AWS", "Unit Testing"],
    atsKeywords: ["Agile", "API Design", "Authentication", "Cloud Deployment"],
    suggestions: [
      "Add a bullet point about building REST APIs with Node.js.",
      "Mention PostgreSQL experience in the project section.",
      "Add testing tools such as Jest, Vitest, or Postman.",
      "Highlight Agile teamwork and GitHub workflow.",
    ],
    coverLetterGuidance: [
      "Open with the direct overlap between the role and your full-stack project work.",
      "Use one short example connecting React UI decisions to backend API design.",
    ],
    interviewQuestions: {
      technical: [
        "How would you design the API for this app?",
        "How do you handle authentication securely?",
      ],
      behavioral: ["Describe a time you debugged a difficult issue."],
      project: [
        "Which CareerMatch AI architecture decisions would you explain first?",
      ],
    },
    roadmap: {
      quickWins: ["Add Docker, CI/CD, and AWS keywords where truthful."],
      shortTerm: ["Build a small Dockerized deployment of the app."],
      mediumTerm: [
        "Deploy the app to a cloud platform and document the release workflow.",
      ],
    },
  };

  const analysis = await prisma.$transaction(async (tx) => {
    const createdAnalysis = await tx.jobAnalysis.create({
      data: {
        userId,
        resumeId: resume.id,
        jobTitle: input.jobTitle,
        company: input.company,
        jobDescription: input.jobDescription,
        fitScore: aiResult.fitScore,
        status: "SAVED",
        summary: aiResult.summary,
        strengths: aiResult.strengths,
        weaknesses: aiResult.weaknesses,
        coverLetterGuidance: aiResult.coverLetterGuidance,
      },
    });

    await tx.analysisSkill.createMany({
      data: [
        ...aiResult.matchedSkills.map((name) => ({
          analysisId: createdAnalysis.id,
          name,
          type: SkillType.MATCHED,
        })),
        ...aiResult.missingSkills.map((name) => ({
          analysisId: createdAnalysis.id,
          name,
          type: SkillType.MISSING,
        })),
        ...aiResult.atsKeywords.map((name) => ({
          analysisId: createdAnalysis.id,
          name,
          type: SkillType.ATS_KEYWORD,
        })),
      ],
    });

    await tx.analysisSuggestion.createMany({
      data: aiResult.suggestions.map((content, index) => ({
        analysisId: createdAnalysis.id,
        content,
        order: index,
      })),
    });

    await tx.interviewQuestion.createMany({
      data: [
        ...aiResult.interviewQuestions.technical.map((question, index) => ({
          analysisId: createdAnalysis.id,
          question,
          type: QuestionType.TECHNICAL,
          order: index,
        })),
        ...aiResult.interviewQuestions.behavioral.map((question, index) => ({
          analysisId: createdAnalysis.id,
          question,
          type: QuestionType.BEHAVIORAL,
          order: index,
        })),
        ...aiResult.interviewQuestions.project.map((question, index) => ({
          analysisId: createdAnalysis.id,
          question,
          type: QuestionType.PROJECT,
          order: index,
        })),
      ],
    });

    await tx.roadmapItem.createMany({
      data: [
        ...aiResult.roadmap.quickWins.map((content, index) => ({
          analysisId: createdAnalysis.id,
          content,
          type: RoadmapType.QUICK_WIN,
          order: index,
        })),
        ...aiResult.roadmap.shortTerm.map((content, index) => ({
          analysisId: createdAnalysis.id,
          content,
          type: RoadmapType.SHORT_TERM,
          order: index,
        })),
        ...aiResult.roadmap.mediumTerm.map((content, index) => ({
          analysisId: createdAnalysis.id,
          content,
          type: RoadmapType.MEDIUM_TERM,
          order: index,
        })),
      ],
    });

    await tx.usageLog.create({
      data: {
        userId,
        action: UsageAction.JOB_ANALYSIS,
      },
    });

    return createdAnalysis;
  });

  redirect(`/jobs/${analysis.id}`);
}
