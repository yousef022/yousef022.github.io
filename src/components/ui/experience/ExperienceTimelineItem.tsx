import React from "react";
import Card from "../Card";
import type { Experience } from "../../../features/experience/experience.data";
import "../../../styles/Experience.css";

type Props = {
  item: Experience;
  animate?: boolean;
};

const ExperienceTimelineItem: React.FC<Props> = ({ item, animate = true }) => {
  const isCurrent = item.period.toLowerCase().includes("present");

  return (
    <Card className={`xpCard${isCurrent ? " isCurrent" : ""}`} animate={animate}>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
        <h3 style={{ margin: 0 }}>{item.role}</h3>
        <span className="kbd">{item.period}</span>
      </div>

      <p className="p" style={{ marginTop: 10 }}>
        {item.summary}
      </p>

      <ul className="uiBullets uiBullets--body">
        {item.highlights.map((highlight) => (
          <li key={highlight}>
            {highlight}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ExperienceTimelineItem;
