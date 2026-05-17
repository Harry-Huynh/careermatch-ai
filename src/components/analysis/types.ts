export type AnalysisReport = {
  id: string;
  jobTitle: string;
  company: string;
  fitScore: number;
  status: string;
  createdAt: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  matchedSkills: string[];
  missingSkills: string[];
  atsKeywords: string[];
  suggestions: string[];
  coverLetterGuidance: string[];
  interviewQuestions: {
    technical: string[];
    behavioral: string[];
    project: string[];
  };
  roadmap: {
    quickWins: string[];
    shortTerm: string[];
    mediumTerm: string[];
  };
};

export function getFitScoreLabel(score: number) {
  if (score >= 80) {
    return "Strong fit";
  }

  if (score >= 60) {
    return "Good fit";
  }

  if (score >= 40) {
    return "Stretch fit";
  }

  return "Low fit";
}
