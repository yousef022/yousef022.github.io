import React, { useMemo } from "react";
import Timeline, { type TimelineEntry, type TimelineProps } from "../Timeline";
import ExperienceTimelineItem from "../../ui/experience/ExperienceTimelineItem";
import type { Experience } from "../../../features/experience/experience.data";

type Props = {
  items: Experience[];
  limit?: number;
  timelineProps?: Omit<TimelineProps, "data">;
};

const ExperienceTimelineSection: React.FC<Props> = ({ items, limit, timelineProps }) => {
  const sliced = limit ? items.slice(0, limit) : items;

  const data: TimelineEntry[] = useMemo(
    () =>
      sliced.map((item) => ({
        title: item.company,
        content: <ExperienceTimelineItem item={item} animate={false} />,
      })),
    [sliced]
  );

  return <Timeline data={data} {...timelineProps} />;
};

export default ExperienceTimelineSection;

