import Card from "../ui/Card";
import Tag from "../ui/Tag";
import type { Project } from "../../features/projects/project.types";
import { Link } from "react-router-dom";
import "../../styles/CaseStudy.css"

type Props = {
  project: Project;
  highlightCount?: number; // default 2
  stackCount?: number;     // default 5
};

const CaseStudyCard: React.FC<Props> = ({ project, highlightCount = 2, stackCount = 5 }) => (
  <Card className="caseCard">
    <div className="caseTop">
      <div className="caseTitle">
        <h3 className="caseName">{project.name}</h3>
        <p className="caseOneLiner">{project.oneLiner}</p>
      </div>

      <Link to={`/projects/${project.slug}`} className="kbd caseCta">
        Case study
      </Link>
    </div>

    {project.highlights?.length ? (
      <ul className="uiBullets">
        {project.highlights.slice(0, highlightCount).map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    ) : null}

    <div className="stack caseStack">
      {project.stack.slice(0, stackCount).map((s) => (
        <Tag key={s} text={s} />
      ))}
    </div>
  </Card>
);

export default CaseStudyCard;
