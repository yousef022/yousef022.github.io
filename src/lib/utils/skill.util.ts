export type SkillGroup = "languages" | "web" | "frameworks" | "databases" | "soft" | "default";

export const getBucketGroup = (title: string): SkillGroup => {
  const t = title.toLowerCase();
  if (t.includes("language")) return "languages";
  if (t.includes("web")) return "web";
  if (t.includes("framework")) return "frameworks";
  if (t.includes("database")) return "databases";
  if (t.includes("soft")) return "soft";
  return "default";
};

export const dedupeStrings = (items: readonly string[]) => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of items) {
    const item = raw.trim();
    if (!item) continue;
    if (seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
};

export const getSkillIconFallback = (skill: string) => {
  const words = skill.split(/[ ./#+-]+/).filter(Boolean);
  const initials = words
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const colors = ["#7a5cff", "#00dcff", "#ff6b6b", "#ffb86b", "#51e3a4", "#a78bfa"];
  const index = skill.length % colors.length;
  return { initials, color: colors[index] };
};
