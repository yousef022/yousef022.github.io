import type { IconType } from "react-icons";

import {
  SiKotlin,
  SiSwift,
  SiPython,
  SiTypescript,
  SiCplusplus,
  SiHtml5,
  SiCss3,
  SiSass,
  SiBootstrap,
  SiTailwindcss,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiAmazondynamodb,
} from "react-icons/si";

import { TbCrown, TbMessageCircle, TbPuzzle } from "react-icons/tb";

export const SKILL_ICON_BY_LABEL: Record<string, IconType> = {
  // Languages
  Kotlin: SiKotlin,
  Swift: SiSwift,
  Python: SiPython,
  TypeScript: SiTypescript,
  "C/C++": SiCplusplus,

  // Web
  HTML: SiHtml5,
  CSS: SiCss3,
  Sass: SiSass,
  Bootstrap: SiBootstrap,
  "Tailwind CSS": SiTailwindcss,

  // Frameworks
  React: SiReact,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  FastAPI: SiFastapi,
  "React Native": SiReact,

  // Databases
  Postgres: SiPostgresql,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,
  DynamoDB: SiAmazondynamodb,

  // Soft skills
  Leadership: TbCrown,
  Communication: TbMessageCircle,
  "Problem solving": TbPuzzle,
};
