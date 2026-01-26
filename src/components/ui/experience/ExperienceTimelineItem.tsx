import React from "react";
import Card from "../Card";
import type { Experience } from "../../../features/experience/experience.data";

type Props = { item: Experience };

const ExperienceTimelineItem: React.FC<Props> = ({ item }) => {
  return (
    <Card>
      <div
        className="row"
        style={{ justifyContent: "space-between", alignItems: "baseline" }}
      >
        <h3 style={{ margin: 0 }}>{item.role}</h3>
        <span className="kbd">{item.period}</span>
      </div>

      <p className="p" style={{ marginTop: 10 }}>
        {item.summary}
      </p>

      <ul style={{ margin: "10px 0 0", paddingLeft: 18 }}>
        {item.highlights.map((highlight) => (
          <li key={highlight} className="p">
            {highlight}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ExperienceTimelineItem;
