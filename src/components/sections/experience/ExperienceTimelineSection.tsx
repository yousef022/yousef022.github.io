import React, { useMemo, useState } from "react";
import Timeline, { type TimelineEntry, type TimelineProps } from "../Timeline";
import ExperienceTimelineItem from "../../ui/experience/ExperienceTimelineItem";
import type { Experience } from "../../../features/experience/experience.data";

type Props = {
  items: Experience[];
  limit?: number;
  timelineProps?: Omit<TimelineProps, "data">;
};

const getInitials = (name: string) => {
  const words = name.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  if (!words.length) return "CO";
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const resolvePublicSrc = (src: string) => {
  // Keep remote/data URLs untouched.
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;

  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedSrc = src.startsWith("/") ? src.slice(1) : src;
  return `${normalizedBase}${normalizedSrc}`;
};

const CompanyLogo: React.FC<{ company: string; logo?: Experience["logo"] }> = ({ company, logo }) => {
  const [loadFailed, setLoadFailed] = useState(false);
  const initials = logo?.initials ?? getInitials(company);
  const src = logo?.src ? resolvePublicSrc(logo.src) : undefined;

  if (!src || loadFailed) return <>{initials}</>;

  return <img src={src} alt="" className="ac-timeline__companyLogoImg" onError={() => setLoadFailed(true)} />;
};

const ExperienceTimelineSection: React.FC<Props> = ({ items, limit, timelineProps }) => {
  const sliced = limit ? items.slice(0, limit) : items;

  const data: TimelineEntry[] = useMemo(
    () =>
      sliced.map((item) => ({
        id: `${item.company}-${item.period}`,
        title: (
          <span className="ac-timeline__titleInner">
            <span
              className="ac-timeline__companyLogo"
              style={
                {
                  ["--company-logo-bg"]: item.logo?.bg ?? "rgba(120, 100, 255, 0.24)",
                  ["--company-logo-fg"]: item.logo?.color ?? "rgba(231, 234, 241, 0.95)",
                } as React.CSSProperties
              }
              aria-hidden
            >
              <CompanyLogo company={item.company} logo={item.logo} />
            </span>
            <span className="ac-timeline__companyName">{item.company}</span>
          </span>
        ),
        content: <ExperienceTimelineItem item={item} animate={false} />,
      })),
    [sliced]
  );

  return <Timeline data={data} {...timelineProps} />;
};

export default ExperienceTimelineSection;

