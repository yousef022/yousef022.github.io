import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Tag from "../../components/ui/Tag";
import CaseStudyGallery from "../../components/sections/caseStudies/CaseStudyGallery";
import { TbArrowLeft, TbArrowUpRight } from "react-icons/tb";
import { selectCaseStudyBySlug } from "../../features/caseStudies/caseStudy.selectors";
import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";
import { profile } from "../../features/profile/profile.data";
import "../../styles/ProjectSlug.css";

const Project: React.FC = () => {
  const { slug } = useParams();
  const project = selectCaseStudyBySlug(slug);

  useDocumentTitle(`${profile.name} - ${project?.name ?? "Product Work"}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <Card className="caseDetailNotFound">
        <h1 className="caseDetailNotFound__title">Product story not found</h1>
        <p className="p">This case study may have moved or is not available.</p>
        <Link to="/projects" className="caseDetail__back">
          <TbArrowLeft aria-hidden="true" />
          All product work
        </Link>
      </Card>
    );
  }

  return (
    <article className="caseDetail">
      <Link to="/projects" className="caseDetail__back">
        <TbArrowLeft aria-hidden="true" />
        All product work
      </Link>

      <Card className="caseDetailHero">
        <div className="caseDetailHero__main">
          <div className="caseDetail__meta">
            <p className="caseDetail__category">{project.category}</p>
            {project.company ? (
              <p className="caseDetail__company">Built at {project.company.name}</p>
            ) : null}
          </div>
          <h1 className="caseDetail__title">{project.name}</h1>
          <p className="caseDetail__lead">{project.detail.overview}</p>

          <div className="stack caseDetail__stack" aria-label={`${project.name} technologies`}>
            {project.stack.map((technology) => (
              <Tag key={technology} text={technology} />
            ))}
          </div>
        </div>

        <dl className="caseDetailSummary">
          <div>
            <dt>My role</dt>
            <dd>{project.detail.role}</dd>
          </div>
          <div>
            <dt>Why it mattered</dt>
            <dd>{project.impact}</dd>
          </div>
        </dl>
      </Card>

      {project.gallery ? (
        <CaseStudyGallery key={project.slug} productName={project.name} gallery={project.gallery} />
      ) : null}

      <div className="caseDetailGrid">
        <Card className="caseDetailPanel">
          <h2>What I owned</h2>
          <ul className="caseDetailList">
            {project.detail.contributions.map((contribution) => (
              <li key={contribution}>{contribution}</li>
            ))}
          </ul>

          <div className="caseDetailOutcome">
            <span>Outcome</span>
            <p>{project.detail.outcome}</p>
          </div>
        </Card>

        <Card className="caseDetailPanel caseDetailPanel--secondary">
          <h2>Selected implementation</h2>
          <ul className="caseDetailList caseDetailList--plain">
            {project.detail.implementation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {project.detail.note ? (
            <div className="caseDetailNote">
              <span>Scope note</span>
              <p>{project.detail.note}</p>
            </div>
          ) : null}

          {project.links?.length ? (
            <div className="caseDetailLinks">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer noopener">
                  <span>{link.label}</span>
                  <TbArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : null}
        </Card>
      </div>

      {project.company ? (
        <p className="caseDetailAttribution">{project.company.attribution}</p>
      ) : null}
    </article>
  );
};

export default Project;
