export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    company: "DeepIDV",
    role: "Software Engineer",
    period: "July 2025 - Present",
    summary: "Building identity verification and device management platform systems.",
    highlights: [
      "Shipped features for onboarding, verification, and operational tooling",
      "Reduced support overhead through better logging, clearer failure handling, and RCA-driven fixes",
    ],
  },
  {
    company: "Big Instance Technologies",
    role: "Software Developer",
    period: "Aug 2024 - July 2025",
    summary: "Built systems to manage and monitor telecom equipment.",
    highlights: [
      "Designed workflows for device monitoring and reporting",
      "Delivered stable UI patterns for operational tooling",
    ],
  },
  {
    company: "CleanList.Ai",
    role: "Full-Stack Developer Intern",
    period: "Feb 2024 - Aug 2024",
    summary: "Developed an email validation system for generated user leads.",
    highlights: [
      "Implemented validation services and API endpoints",
      "Improved lead quality with better verification logic",
    ],
  },
  {
    company: "SOTI",
    role: "Research Assistant",
    period: "Sep 2022 - Dec 2023",
    summary: "Contributed to SOTI One platform features and device health research.",
    highlights: [
      "Updated data collection app for new Android devices",
      "Built fall detection research workflows and surface detection models",
    ],
  },
];
