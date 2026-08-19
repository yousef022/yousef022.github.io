import type { IconType } from "react-icons";

import {
  SiKotlin,
  SiSwift,
  SiPython,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiFirebase,
  SiAmazondynamodb,
  SiAmazonapigateway,
  SiAmazonwebservices,
  SiAwslambda,
  SiDocker,
} from "react-icons/si";

import {
  TbApi,
  TbBrowser,
  TbFingerprint,
  TbPlugConnected,
  TbShieldLock,
  TbTestPipe2,
} from "react-icons/tb";

export const SKILL_ICON_BY_LABEL: Record<string, IconType> = {
  // Product engineering
  TypeScript: SiTypescript,
  React: SiReact,
  "Node.js": SiNodedotjs,
  "Browser Extensions": TbBrowser,
  "Identity & Workflows": TbFingerprint,

  // APIs and reliability
  "REST APIs": TbApi,
  "API Integrations": TbPlugConnected,
  "Auth & Sessions": TbShieldLock,
  "Automated Testing": TbTestPipe2,
  "Python / FastAPI": SiPython,

  // Cloud and data
  "AWS CDK": SiAmazonwebservices,
  Lambda: SiAwslambda,
  "API Gateway": SiAmazonapigateway,
  DynamoDB: SiAmazondynamodb,
  Postgres: SiPostgresql,
  Docker: SiDocker,

  // Mobile engineering
  Kotlin: SiKotlin,
  Swift: SiSwift,
  "React Native": SiReact,
  Firebase: SiFirebase,
};
