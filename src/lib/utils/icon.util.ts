import type { IconType } from "react-icons";
import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";
import type { IconSpec } from "../models/icon.types";

const PACKS = {
  si: SiIcons as unknown as Record<string, IconType>,
  tb: TbIcons as unknown as Record<string, IconType>,
} as const;

export function resolveIcon(spec?: IconSpec | null): IconType | null {
  if (!spec) return null;

  const lib = PACKS[spec.pack];
  const Icon = lib?.[spec.name];

  return typeof Icon === "function" ? Icon : null;
}
