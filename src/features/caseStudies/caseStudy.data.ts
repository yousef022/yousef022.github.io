import type { CaseStudy } from "./caseStudy.types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "deepeye",
    name: "Deepeye",
    category: "Browser extension and web platform",
    oneLiner: "A browser-based product for analyzing text and images from the page you are viewing.",
    ownership:
      "Built and launched the Chrome extension, then delivered its dashboard, sign-in flows, API layer, and cloud infrastructure.",
    impact: "Connected the browser experience and account platform into one dependable product journey.",
    stack: ["TypeScript", "React", "Node.js", "Chrome APIs", "AWS"],
    links: [
      { label: "Official product", href: "https://www.deepidv.com/deepeye" },
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/deepeye-deepfake-ai-conte/jaffeccggbgmjghbmkhhfllcldceihie",
      },
    ],
    company: {
      name: "deepidv",
      attribution:
        "deepeye is a product of deepidv. This case study describes my individual engineering contributions while employed by the company.",
    },
    gallery: {
      previewIndex: 1,
      previewPosition: "center 20%",
      items: [
        {
          src: "case-studies/deepeye/extension-overview.jpg",
          alt: "Deepeye Chrome extension showing a page scan for text and images",
          title: "Page scanning",
          caption: "The extension flow for scanning text and images on the current browser page.",
        },
        {
          src: "case-studies/deepeye/deep-scan-results.webp",
          alt: "Deepeye browser extension showing image and text analysis results beside a web article",
          title: "Analysis results",
          caption:
            "Deep Scan results presented beside the page, with image findings and supporting text signals.",
          source: {
            label: "deepidv product page",
            href: "https://www.deepidv.com/deepeye",
          },
        },
      ],
      source: {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/deepeye-deepfake-ai-conte/jaffeccggbgmjghbmkhhfllcldceihie",
      },
      attribution:
        "Official Deepeye product imagery from deepidv and its Chrome Web Store listing. Shown with attribution for portfolio commentary; all product and image rights remain with their respective owners.",
    },
    featured: true,
    flagship: true,
    detail: {
      overview:
        "Deepeye brings text and image analysis into a Chrome extension, backed by a web dashboard and authenticated services.",
      role: "Product engineering across the extension, web application, backend, and cloud delivery.",
      contributions: [
        "Built and published the Chrome Web Store extension for analyzing text and images.",
        "Created the dashboard and authentication experience supporting user accounts.",
        "Implemented the API integrations and cloud infrastructure connecting the product surfaces.",
      ],
      implementation: [
        "Designed extension flows around the active browser page while keeping account state and results consistent.",
        "Connected the extension and dashboard to authenticated backend services.",
        "Handled deployment and infrastructure concerns as part of the same product boundary.",
      ],
      outcome:
        "A cohesive browser and web product rather than a standalone extension with disconnected supporting tools.",
      note: "The underlying AI model was part of the product; my work focused on the application and platform around it, not model training.",
    },
  },
  {
    slug: "deepcam",
    name: "DeepCam",
    category: "Managed Android platform",
    oneLiner: "A managed Android device platform for dedicated identity-verification hardware.",
    ownership:
      "Built the Kotlin Device Policy Controller, device-owner provisioning, kiosk controls, policy enforcement, companion-app flows, and backend integrations.",
    impact:
      "Made dedicated devices repeatable to provision, govern, and connect to onboarding and status workflows.",
    stack: ["Kotlin", "Android Enterprise", "React Native", "FastAPI", "AWS"],
    links: [{ label: "Official product", href: "https://www.deepidv.com/in-person-verification" }],
    company: {
      name: "deepidv",
      attribution:
        "deepcam is a product of deepidv. This case study describes my individual engineering contributions while employed by the company.",
    },
    gallery: {
      items: [
        {
          src: "case-studies/deepcam/product-overview.webp",
          alt: "DeepCam hardware beside the companion app device configuration screen",
          title: "Managed device",
          caption: "DeepCam hardware alongside the companion app's device configuration view.",
          framing: "contained",
        },
        {
          src: "case-studies/deepcam/commercial-device.webp",
          alt: "DeepCam commercial device showing an in-person face verification screen",
          title: "Verification device",
          caption: "The commercial DeepCam device shown running an in-person face-verification flow.",
          framing: "contained",
        },
      ],
      source: {
        label: "deepidv product page",
        href: "https://www.deepidv.com/in-person-verification",
      },
      attribution:
        "Official product imagery published by deepidv. Shown with attribution for portfolio commentary; all product and image rights remain with their respective owners.",
    },
    featured: true,
    detail: {
      overview:
        "DeepCam is a managed Android platform running on dedicated hardware for in-person identity-verification workflows.",
      role: "Core Android device management, provisioning, kiosk behavior, and platform integration.",
      contributions: [
        "Built the Kotlin Device Policy Controller used to manage dedicated devices.",
        "Implemented device-owner provisioning, kiosk controls, and policy enforcement.",
        "Delivered companion-app work and backend integrations for onboarding and device status.",
      ],
      implementation: [
        "Structured provisioning so devices could enter a controlled state from initial setup.",
        "Applied kiosk and device policies through Android Enterprise management APIs.",
        "Connected device state to backend onboarding and status workflows.",
      ],
      outcome:
        "A controlled device experience that could be provisioned and operated consistently across managed hardware deployments.",
    },
  },
  {
    slug: "generator-fleet-monitoring",
    name: "Generator Fleet Monitoring & Automation",
    category: "Fleet operations and automation",
    oneLiner:
      "Operations software for onboarding and monitoring Kohler generators in a Canadian telecom deployment.",
    ownership:
      "Built TypeScript and Node.js services, APIs, Bull/Redis jobs, mobile automation, data workflows, deployment, and reliability improvements.",
    impact: "Turned multi-step operational work into observable, recoverable workflows for fleet teams.",
    stack: ["TypeScript", "Node.js", "Bull", "Redis", "Docker"],
    company: {
      name: "Big Instance Technologies",
      attribution:
        "This work was completed at Big Instance Technologies for a telecom deployment. This case study describes my individual engineering contributions.",
    },
    featured: true,
    detail: {
      overview:
        "This product supported the onboarding, monitoring, and operational management of Kohler generators in a Canadian telecom deployment.",
      role: "Backend services, workflow automation, system integration, deployment, and production reliability.",
      contributions: [
        "Built TypeScript and Node.js APIs around generator onboarding and monitoring workflows.",
        "Implemented Bull and Redis background jobs for long-running and retryable work.",
        "Added mobile automation and structured data flows where direct integrations were limited.",
      ],
      implementation: [
        "Separated request handling from background work so operational tasks could be retried and observed.",
        "Wrapped third-party interactions behind a consistent internal API boundary.",
        "Improved deployment and failure handling across the workflow.",
      ],
      outcome:
        "A more dependable operational path for moving generators from onboarding into ongoing monitoring.",
    },
  },
  {
    slug: "identity-verification-workflows",
    name: "Identity Verification Workflows",
    category: "Configurable verification platform",
    oneLiner: "Configurable verification journeys spanning admin setup, user checks, and backend routing.",
    ownership:
      "Built admin configuration, user-verification flows, backend routing, deepfake and passport NFC paths, and interrupted-session recovery.",
    impact: "Kept complex verification paths consistent and resumable after interrupted sessions.",
    stack: ["TypeScript", "React", "Node.js", "REST APIs", "NFC"],
    links: [{ label: "Official product", href: "https://www.deepidv.com/workflows" }],
    company: {
      name: "deepidv",
      attribution:
        "These verification workflows are part of the deepidv platform. This case study describes my individual engineering contributions while employed by the company.",
    },
    featured: false,
    detail: {
      overview:
        "A set of configurable identity-verification journeys linking administrative setup, end-user checks, and backend decision routing.",
      role: "Full-stack workflow design and implementation across administrative, user-facing, and backend surfaces.",
      contributions: [
        "Built administrative configuration for composing verification paths.",
        "Implemented user flows for deepfake checks and passport NFC verification.",
        "Added backend routing and recovery behavior for interrupted sessions.",
      ],
      implementation: [
        "Mapped configuration choices into predictable user and backend workflow states.",
        "Preserved enough session context to resume eligible journeys after interruption.",
        "Kept specialized verification steps behind a consistent orchestration layer.",
      ],
      outcome:
        "Complex verification paths remained understandable to configure and more resilient for users completing them.",
    },
  },
];
