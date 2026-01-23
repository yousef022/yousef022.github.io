import type { Project } from "./project.types";

export const projects: Project[] = [
  {
    slug: "deepcam-device-provisioning",
    name: "DeepCam Device Provisioning",
    oneLiner: "Provisioned kiosk devices with secure onboarding + OTA flows.",
    stack: ["React", "TypeScript", "AWS", "Android/Kotlin"],
    highlights: [
      "Guided provisioning flow with clear failure states",
      "Environment parity across dev/staging/prod",
      "Reusable service boundaries + typed models",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/YOUR_GITHUB/REPO" },
    ],
  },
];
