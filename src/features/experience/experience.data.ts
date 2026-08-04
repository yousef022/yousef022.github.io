export type ExperienceLogo = {
  src?: string;
  initials?: string;
  bg?: string;
  color?: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  logo?: ExperienceLogo;
};

export const experiences: Experience[] = [
  {
    company: "deepidv",
    role: "Software Engineer",
    period: "July 2025 - Present",
    summary: "Building identity verification and device management platform systems.",
    highlights: [
      "Shipped features for onboarding, verification, and operational tooling",
      "Reduced support overhead through better logging, clearer failure handling, and RCA-driven fixes",
    ],
    logo: {
      src: "/logos/deepidv.png",
      initials: "DI",
      bg: "rgba(70, 110, 255, 0.26)",
      color: "#c9d8ff",
    },
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
    logo: {
      src: "/logos/big-instance-technologies.png",
      initials: "BI",
      bg: "rgba(250, 254, 255, 0.2)",
      color: "#c4f1ff",
    },
  },
  {
    company: "Cleanlist.ai",
    role: "Full-Stack Developer Intern",
    period: "Feb 2024 - Aug 2024",
    summary: "Developed an email validation system for generated user leads.",
    highlights: [
      "Implemented validation services and API endpoints",
      "Improved lead quality with better verification logic",
    ],
    logo: {
      src: "/logos/cleanlist-ai.png",
      initials: "CL",
      bg: "rgba(95, 211, 142, 0.18)",
      color: "#ccffe5",
    },
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
    logo: { initials: "SO", bg: "rgba(212, 146, 255, 0.20)", color: "#f2d8ff" },
  },
];
