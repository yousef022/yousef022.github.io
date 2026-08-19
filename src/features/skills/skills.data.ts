import { type SkillBucket } from "../../lib/models/skill.types";

export const skillBuckets = [
  {
    title: "Product Engineering",
    items: ["TypeScript", "React", "Node.js", "Browser Extensions", "Identity & Workflows"],
  },
  {
    title: "APIs & Reliability",
    items: ["REST APIs", "API Integrations", "Auth & Sessions", "Automated Testing", "Python / FastAPI"],
  },
  {
    title: "Cloud & Data",
    items: ["AWS CDK", "Lambda", "API Gateway", "DynamoDB", "Postgres", "Docker"],
  },
  {
    title: "Mobile Engineering",
    items: ["Kotlin", "Swift", "React Native", "Firebase"],
  },
] as SkillBucket[];
