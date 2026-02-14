import type { CaseStudy } from "./caseStudy.types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "deepcam",
    name: "DeepCam",
    oneLiner:
      "In-store identity verification with a kiosk mode + provisioning flow for reliable, secure deployments.",
    stack: ["Kotlin", "Python", "React Native", "FastAPI", "AWS"],
    highlights: [
      "Owned the device provisioning flow for secure, repeatable in-store deployments.",
      "Built resilient enrollment/config flows for unreliable networks and non-technical operators.",
      "Improved rollout + support ops with clearer diagnostics and safer config/version controls.",
    ],
    links: [
      { label: "Product", href: "https://www.deepidv.com/products/deepcam" },
      { label: "White paper", href: "https://www.deepidv.com/resources/pdf/deepcam-whitepaper.pdf" },
    ],
    featured: true,
  },
  {
    slug: "generator-ops-api",
    name: "Generator Ops API",
    oneLiner:
      "An integration API that automated Kohler generator operations for a major telecom client.",
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Express.js", "Docker"],
    highlights: [
      "Automated generator onboarding, monitoring, and exercise scheduling at fleet scale.",
      "Wrapped a third-party generator management app into a clean internal API for ops workflows.",
      "Hardened reliability for production: retries, rate limiting, and clear failure/health signals.",
    ],
    links: [
      { label: "Platform", href: "https://www.kohlerhomeenergy.rehlko.com/kohler-energy-management-app" },
    ],
    featured: true,
  },
];
