import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";
import { profile } from "../../features/profile/profile.data";
import { selectAllProjects } from "../../features/projects/project.selectors";
import ProjectCard from "../../components/sections/ProjectCard";

const Projects: React.FC = () => {
  useDocumentTitle(`${profile.name} · Projects`);

  const projects = selectAllProjects();

  return (
    <div className="grid" style={{ gap: 14 }}>
      <div>
        <h1 className="h1" style={{ fontSize: 34 }}>Projects</h1>
        <p className="p">Case-study style: problem → constraints → tradeoffs → outcomes.</p>
      </div>

      <div className="grid2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
