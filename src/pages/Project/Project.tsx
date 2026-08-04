import { Link, useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Tag from "../../components/ui/Tag";
import Divider from "../../components/ui/Divider";
import { selectProjectBySlug } from "../../features/projects/project.selectors";
import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";
import { profile } from "../../features/profile/profile.data";
import "../../styles/ProjectSlug.css"

const Project: React.FC = () => {
  const { slug } = useParams();
  const project = selectProjectBySlug(slug);

  useDocumentTitle(`${profile.name} - ${project?.name ?? "Project"}`);

  if (!project) {
    return (
      <Card>
        <p className="p">Project not found.</p>
        <Link to="/projects" className="kbd">
          Back to Projects
        </Link>
      </Card>
    );
  }

  return (
    <div className="grid" style={{ gap: 14 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <Link to="/projects" className="kbd">
          Back to Projects
        </Link>
        <span className="kbd">{project.slug}</span>
      </div>

      {/* Header */}
      <Card className="caseHeaderCard">
        <div className="caseHeader">
          <div style={{ minWidth: 0 }}>
            <h1 className="h1 caseTitle">{project.name}</h1>
            <p className="p caseSubtitle">{project.oneLiner}</p>

            <div className="stack caseStackRow">
              {project.stack.slice(0, 6).map((stackItem) => (
                <Tag key={stackItem} text={stackItem} />
              ))}
            </div>
          </div>

          <div className="caseHeaderActions">
            {project.links?.slice(0, 2).map((link) => (
              <a key={link.href} href={link.href} className="kbd" target="_blank" rel="noreferrer noopener">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Card>

      {/* Body: two-column on desktop */}
      <div className="caseGrid">
        {/* Left: narrative (short) */}
        <Card className="caseBodyCard">
          <h3 className="caseH3">What it is</h3>
          <p className="p" style={{ marginTop: 8 }}>
            {project.oneLiner}
          </p>

          <Divider />

          <h3 className="caseH3">Key outcomes</h3>
          <ul className="caseList">
            {project.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          {/* Optional: if you want to keep more highlights without length */}
          {project.highlights.length > 3 ? (
            <p className="p" style={{ marginTop: 10 }}>
              +{project.highlights.length - 3} more outcomes on request.
            </p>
          ) : null}
        </Card>

        {/* Right: metadata */}
        <Card className="caseSideCard">
          <h3 className="caseH3">Stack</h3>
          <div className="stack" style={{ marginTop: 10 }}>
            {project.stack.map((stackItem) => (
              <Tag key={stackItem} text={stackItem} />
            ))}
          </div>

          {project.links?.length ? (
            <>
              <Divider />
              <h3 className="caseH3">Links</h3>
              <ul className="caseLinks">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="p" target="_blank" rel="noreferrer noopener">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </Card>
      </div>
    </div>
  );
};

export default Project;
