import { Link, useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Tag from "../../components/ui/Tag";
import Divider from "../../components/ui/Divider";
import { selectProjectBySlug } from "../../features/projects/project.selectors";
import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";
import { profile } from "../../features/profile/profile.data";

const Project: React.FC = () => {
  const { slug } = useParams();
  const project = selectProjectBySlug(slug);

  useDocumentTitle(`${profile.name} · ${project?.name ?? "Project"}`);

  if (!project) {
    return (
      <Card>
        <p className="p">Project not found.</p>
        <Link to="/projects" className="kbd">← Back to Projects</Link>
      </Card>
    );
  }

  return (
    <div className="grid" style={{ gap: 14 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <Link to="/projects" className="kbd">← Projects</Link>
        <span className="kbd">{project.slug}</span>
      </div>

      <Card>
        <h1 className="h1" style={{ fontSize: 36 }}>{project.name}</h1>
        <p className="p">{project.oneLiner}</p>

        <Divider />

        <h3 style={{ margin: "0 0 10px" }}>Stack</h3>
        <div className="stack">
          {project.stack.map((s) => (
            <Tag key={s} text={s} />
          ))}
        </div>

        <Divider />

        <h3 style={{ margin: "0 0 10px" }}>Highlights</h3>
        <ul style={{ margin: 0, color: "rgba(231,234,241,0.9)", lineHeight: 1.6 }}>
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        {project.links?.length ? (
          <>
            <Divider />
            <h3 style={{ margin: "0 0 10px" }}>Links</h3>
            <ul style={{ margin: 0 }}>
              {project.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="p">{l.label}</a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </Card>
    </div>
  );
};

export default Project;
