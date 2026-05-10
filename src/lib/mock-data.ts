export const resumes = [
  {
    id: "resume-1",
    name: "Full-Stack Developer Resume",
    createdAt: "May 2, 2026",
    preview:
      "Full-stack developer with experience building React, TypeScript, Node.js, and PostgreSQL applications for SaaS teams.",
  },
  {
    id: "resume-2",
    name: "Frontend Engineer Resume",
    createdAt: "April 18, 2026",
    preview:
      "Frontend-focused resume highlighting component systems, accessibility, performance, and dashboard experiences.",
  },
];

export const analysisResult = {
  id: "analysis-1",
  jobTitle: "Full-Stack Software Engineer",
  company: "Northstar Labs",
  fitScore: 78,
  summary:
    "Your resume is a strong match for the role, especially across React, TypeScript, API development, and relational database experience. The main gaps are deployment, testing depth, and cloud operations language.",
  strengths: [
    "Strong alignment with React and TypeScript requirements.",
    "Relevant Node.js and REST API project experience.",
    "PostgreSQL experience maps well to the data layer responsibilities.",
  ],
  weaknesses: [
    "Limited Docker and CI/CD evidence in the resume.",
    "Cloud deployment experience is not prominent enough.",
    "Testing tools should be named more explicitly.",
  ],
  matchedSkills: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST APIs"],
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
    "Use one short example that connects React UI decisions to backend API design.",
    "Address the cloud and testing gap by showing current learning or adjacent experience.",
  ],
  interviewQuestions: {
    technical: [
      "How would you design the API for this app?",
      "How do you handle authentication securely?",
      "How would you improve the AI response reliability?",
    ],
    behavioral: [
      "Describe a time you debugged a difficult issue.",
      "Tell me about a time you balanced speed with maintainability.",
    ],
    project: [
      "Which CareerMatch AI architecture decisions would you explain first?",
      "What tradeoffs did you make when designing the analysis workflow?",
    ],
  },
  roadmap: {
    quickWins: [
      "Add Docker, CI/CD, and AWS keywords where truthful.",
      "Rewrite one project bullet to include measurable API impact.",
    ],
    shortTerm: [
      "Build a small Dockerized deployment of the app.",
      "Add unit tests for one form and one data transformation utility.",
    ],
    mediumTerm: [
      "Deploy the app to a cloud platform and document the release workflow.",
      "Add monitoring or retry logic to the AI analysis pipeline.",
    ],
  },
};

export const recentAnalyses = [
  {
    id: "analysis-1",
    jobTitle: "Full-Stack Software Engineer",
    company: "Northstar Labs",
    fitScore: 78,
    createdAt: "May 8, 2026",
    status: "Saved",
  },
  {
    id: "analysis-2",
    jobTitle: "Frontend Platform Engineer",
    company: "AtlasGrid",
    fitScore: 84,
    createdAt: "May 4, 2026",
    status: "Saved",
  },
  {
    id: "analysis-3",
    jobTitle: "Backend Developer",
    company: "SignalForge",
    fitScore: 69,
    createdAt: "April 29, 2026",
    status: "Draft",
  },
];

export const fitScoreHistory = [
  { date: "Apr 12", score: 62 },
  { date: "Apr 18", score: 68 },
  { date: "Apr 24", score: 72 },
  { date: "May 1", score: 75 },
  { date: "May 8", score: 78 },
];

export const missingSkillsChart = [
  { skill: "Docker", count: 6 },
  { skill: "AWS", count: 5 },
  { skill: "CI/CD", count: 4 },
  { skill: "Testing", count: 4 },
  { skill: "GraphQL", count: 2 },
];

export const dashboardStats = [
  { label: "Total jobs analyzed", value: "12", trend: "+4 this month" },
  { label: "Average fit score", value: "76%", trend: "+8% since April" },
  { label: "Best match", value: "84%", trend: "Frontend Platform Engineer" },
  { label: "Most common missing skill", value: "Docker", trend: "Appears in 6 roles" },
];
