import { type SkillBucket } from "../../lib/models/skill.types";
export const skillBuckets = [
  {
    title: "Programming Languages",
    items: ["TypeScript", "Python", "Kotlin", "Swift", "C/C++"],
  },
  {
    title: "Web Development",
    items: [ "Node.js",  "HTML", "CSS", "Sass", "Tailwind CSS"],
  },
  {
    title: "Frameworks",
    items: ["React Native", "React", "FastAPI", "Express.js"],
  },
  {
    title: "Databases",
    items: ["Postgres", "MongoDB", "DynamoDB", "Firebase"],
  },
  {
    title: "Soft Skills",
    items: ["Leadership", "Problem solving", "Communication", ],
  },
] as SkillBucket[];
