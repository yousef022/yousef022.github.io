import type { ShipLogItem } from "./shiplog.types";

export const shipLog: ShipLogItem[] = [
  {
    date: "2026-01-10",
    title: "Shipped device onboarding hardening",
    summary:
      "Improved error handling, added environment parity checks, and reduced setup time with clearer UX state transitions.",
    tags: ["Shipping", "Reliability", "DX"],
  },
  {
    date: "2025-12-18",
    title: "Refactored services into reusable boundaries",
    summary:
      "Moved duplicated logic into typed utilities and services to keep pages dumb and prevent drift across features.",
    tags: ["DRY", "Architecture"],
  },
];
