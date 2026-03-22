import type { FC } from "react";
import { Link } from "react-router-dom";
import { TbArrowUpRight } from "react-icons/tb";

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  actionTo?: string;
  className?: string;
};

const SectionHeader: FC<SectionHeaderProps> = ({ title, actionLabel, actionTo, className }) => {
  const classes = ["sectionHeader", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div className="sectionHeader__lead">
        <h2 className="sectionHeader__title">{title}</h2>
        <span className="sectionHeader__line" aria-hidden="true" />
      </div>

      {actionLabel && actionTo ? (
        <Link to={actionTo} className="sectionHeader__link">
          <span>{actionLabel}</span>
          <TbArrowUpRight aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
};

export default SectionHeader;
