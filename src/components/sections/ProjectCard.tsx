import Card from "../ui/Card";
import Tag from "../ui/Tag";
import type { Project } from "../../features/projects/project.types";
import { Link } from "react-router-dom";

type Props = { project: Project };

const ProjectCard: React.FC<Props> = ({ project }) => (
  <Card>
    <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
      <div style={{ minWidth: 0 }}>
        <h3 style={{ margin: 0 }}>{project.name}</h3>
        <p className="p" style={{ marginTop: 8 }}>
          {project.oneLiner}
        </p>
      </div>

      <Link to={`/projects/${project.slug}`} className="kbd">
        Open
      </Link>
    </div>

    <div className="stack" style={{ marginTop: 12 }}>
      {project.stack.map((stackItem) => (
        <Tag key={stackItem} text={stackItem} />
      ))}
    </div>
  </Card>
);

export default ProjectCard;
