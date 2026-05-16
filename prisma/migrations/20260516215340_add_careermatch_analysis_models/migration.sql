/*
  Warnings:

  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AnalysisStatus" AS ENUM ('DRAFT', 'SAVED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('MATCHED', 'MISSING', 'ATS_KEYWORD');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TECHNICAL', 'BEHAVIORAL', 'PROJECT');

-- CreateEnum
CREATE TYPE "RoadmapType" AS ENUM ('QUICK_WIN', 'SHORT_TERM', 'MEDIUM_TERM');

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobAnalysis" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resumeId" TEXT,
    "jobTitle" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "fitScore" INTEGER NOT NULL,
    "status" "AnalysisStatus" NOT NULL DEFAULT 'DRAFT',
    "summary" TEXT NOT NULL,
    "strengths" TEXT[],
    "weaknesses" TEXT[],
    "coverLetterGuidance" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalysisSkill" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SkillType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalysisSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalysisSuggestion" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AnalysisSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewQuestion" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "InterviewQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapItem" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "RoadmapType" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RoadmapItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Resume_userId_createdAt_idx" ON "Resume"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "JobAnalysis_userId_createdAt_idx" ON "JobAnalysis"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "JobAnalysis_userId_fitScore_idx" ON "JobAnalysis"("userId", "fitScore");

-- CreateIndex
CREATE INDEX "JobAnalysis_resumeId_idx" ON "JobAnalysis"("resumeId");

-- CreateIndex
CREATE INDEX "AnalysisSkill_analysisId_idx" ON "AnalysisSkill"("analysisId");

-- CreateIndex
CREATE INDEX "AnalysisSkill_name_idx" ON "AnalysisSkill"("name");

-- CreateIndex
CREATE INDEX "AnalysisSkill_type_idx" ON "AnalysisSkill"("type");

-- CreateIndex
CREATE INDEX "AnalysisSuggestion_analysisId_idx" ON "AnalysisSuggestion"("analysisId");

-- CreateIndex
CREATE INDEX "InterviewQuestion_analysisId_idx" ON "InterviewQuestion"("analysisId");

-- CreateIndex
CREATE INDEX "InterviewQuestion_type_idx" ON "InterviewQuestion"("type");

-- CreateIndex
CREATE INDEX "RoadmapItem_analysisId_idx" ON "RoadmapItem"("analysisId");

-- CreateIndex
CREATE INDEX "RoadmapItem_type_idx" ON "RoadmapItem"("type");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobAnalysis" ADD CONSTRAINT "JobAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobAnalysis" ADD CONSTRAINT "JobAnalysis_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalysisSkill" ADD CONSTRAINT "AnalysisSkill_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "JobAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalysisSuggestion" ADD CONSTRAINT "AnalysisSuggestion_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "JobAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewQuestion" ADD CONSTRAINT "InterviewQuestion_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "JobAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapItem" ADD CONSTRAINT "RoadmapItem_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "JobAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
