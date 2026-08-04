import React from "react";
import Card from "../ui/Card";
import { type SkillBucket } from "../../lib/models/skill.types";
import "../../styles/Skills.css";

import { SKILL_ICON_BY_LABEL } from "../../features/skills/skill.icons";
import { dedupeStrings, getBucketGroup, getSkillIconFallback } from "../../lib/utils/skill.util";

type Props = {
  buckets: SkillBucket[];
};

const SkillsGrid: React.FC<Props> = ({ buckets }) => {
  return (
    <div className="skillsGrid">
      {buckets.map((bucket) => {
        const group = getBucketGroup(bucket.title);
        const items = dedupeStrings(bucket.items);

        return (
          <div key={bucket.title} className="skillsBucket" data-skill-group={group}>
            <Card className="skillsCard" data-skill-group={group}>
              <div className="skillsHeader">
                <h3 className="skillsTitle">{bucket.title}</h3>
              </div>

              <div className="skillsChips">
                {items.map((label) => {
                  const Icon = SKILL_ICON_BY_LABEL[label] ?? null;
                  const fallback = getSkillIconFallback(label);

                  const iconStyle = Icon!
                    ? undefined
                    : { background: `${fallback.color}33`, borderColor: `${fallback.color}55` };

                  return (
                    <div key={`${bucket.title}:${label}`} className="skillChip" title={label}>
                      <span className="skillChip__icon" aria-hidden style={iconStyle}>
                        {Icon ? (
                          <Icon className="skillChip__svg" aria-hidden />
                        ) : (
                          <span className="skillChip__fallback">{fallback.initials}</span>
                        )}
                      </span>

                      <span className="skillChip__label">{label}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsGrid;
