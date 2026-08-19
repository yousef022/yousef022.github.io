import type { Project } from "./project.types";

export const projects: Project[] = [
  {
    slug: "jobhunt-promatch",
    name: "JobHunt ProMatch",
    oneLiner: "Freelancing job platform with matching workflows and multi-role listings.",
    stack: ["Kotlin", "C#", "Node.js", "ASP.NET", "Firebase"],
    highlights: [
      "Capstone project approved for graduation showcase",
      "Built role-based flows for both users and businesses",
      "Coordinated delivery with Agile workflows and JIRA",
    ],
    links: [{ label: "GitHub", href: "https://github.com/yousef022" }],
    featured: true,
  },
  {
    slug: "not-so-typical-marketplace",
    name: "A Not So Typical Marketplace",
    oneLiner: "Pseudo e-commerce marketplace with structured CRUD flows.",
    stack: ["C#", "ASP.NET", "SQL Server", "xUnit"],
    highlights: [
      "Engineered API endpoints for core marketplace features",
      "Implemented data validation for consistent read/write operations",
    ],
    links: [{ label: "GitHub", href: "https://github.com/yousef022" }],
    featured: false,
  },
  {
    slug: "human-fall-detection",
    name: "Human Fall Detection",
    oneLiner: "Fall detection system using Android and IoT beacons for assisted care.",
    stack: ["Kotlin", "Python", "Flask", "IoT"],
    highlights: [
      "Built beacon selection logic for nearest device alerts",
      "Delivered a lightweight backend for real-time fall events",
    ],
    links: [{ label: "GitHub", href: "https://github.com/yousef022" }],
    featured: false,
  },
  {
    slug: "game-deals-finder",
    name: "Game Deals Finder",
    oneLiner: "Android app that tracks video game discounts via CheapShark.",
    stack: ["Kotlin", "REST APIs", "JUnit"],
    highlights: ["Search and sort deals across multiple storefronts", "Currently in closed alpha testing"],
    links: [
      {
        label: "Privacy Policy",
        href: "https://yousef022.github.io/privacypolicy.html",
      },
    ],
    featured: false,
  },
  {
    slug: "ecoscrape-news",
    name: "EcoScrape News",
    oneLiner: "Climate news aggregator powered by scraping and filtering.",
    stack: ["React", "Node.js", "Express.js", "Web Scraping"],
    highlights: [
      "Aggregates headlines from multiple trusted sources",
      "Added source filters for faster browsing",
    ],
    links: [{ label: "GitHub", href: "https://github.com/yousef022" }],
    featured: true,
  },
];
