export type ExperienceLogo = {
  src?: string;
  initials?: string;
  bg?: string;
  color?: string;
  presentation?: "framed" | "bare";
  scale?: number;
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
    period: "July 2025 - August 2026",
    summary: "Built identity-verification products across browser, web, mobile, backend, and cloud.",
    highlights: [
      "Shipped Deepeye's Chrome extension, dashboard, authentication, APIs, and AWS infrastructure",
      "Built DeepCam device management and resumable verification workflows across web, mobile, and backend systems",
    ],
    logo: {
      src: "/logos/deepidv-emblem.svg",
      initials: "DI",
      presentation: "bare",
      scale: 1.12,
    },
  },
  {
    company: "Big Instance Technologies",
    role: "Software Developer",
    period: "Aug 2024 - July 2025",
    summary: "Built generator fleet monitoring and automation software for a major Canadian telecom deployment.",
    highlights: [
      "Built TypeScript and Node.js APIs with Bull/Redis jobs for generator onboarding and monitoring",
      "Automated mobile and data workflows to make fleet operations more observable and recoverable",
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
    summary: "Built email-validation software for lead-generation workflows.",
    highlights: [
      "Implemented validation services and API endpoints for generated lead data",
      "Improved lead quality through more reliable email-verification logic",
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
    summary: "Contributed to Android data collection and device-health research.",
    highlights: [
      "Updated an Android data-collection app for newer devices",
      "Built fall-detection research workflows and surface-classification models",
    ],
    logo: { initials: "SO", bg: "rgba(212, 146, 255, 0.20)", color: "#f2d8ff" },
  },
];
