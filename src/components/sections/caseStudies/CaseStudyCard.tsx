import Card from "../../ui/Card";
import Tag from "../../ui/Tag";
import type { CaseStudy } from "../../../features/caseStudies/caseStudy.types";
import { Link } from "react-router-dom";
import { TbArrowRight, TbArrowUpRight } from "react-icons/tb";
import "../../../styles/CaseStudy.css";

type Props = {
  project: CaseStudy;
  variant?: "featured" | "supporting";
};

const resolvePublicSrc = (src: string) => {
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;

  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedSrc = src.startsWith("/") ? src.slice(1) : src;
  return `${normalizedBase}${normalizedSrc}`;
};

const CaseStudyCard: React.FC<Props> = ({ project, variant = "supporting" }) => {
  const titleId = `case-study-${project.slug}`;
  const previewItem =
    variant === "featured" && project.gallery
      ? project.gallery.items[project.gallery.previewIndex ?? 0]
      : undefined;
  const previewSource = previewItem?.source ?? project.gallery?.source;

  return (
    <Card className={`caseCard caseCard--${variant}`} aria-labelledby={titleId}>
      <div className="caseCard__meta">
        <span>{project.category}</span>
        {project.company ? <span className="caseCard__company">Built at {project.company.name}</span> : null}
      </div>

      <div className="caseCard__body">
        <div className="caseCard__intro">
          <h3 id={titleId} className="caseCard__name">
            {project.name}
          </h3>
          <p className="caseCard__oneLiner">{project.oneLiner}</p>
        </div>

        <div className="caseCard__story">
          <div className="caseCard__point">
            <span>What I owned</span>
            <p>{project.ownership}</p>
          </div>

          <div className="caseCard__point">
            <span>Why it mattered</span>
            <p>{project.impact}</p>
          </div>
        </div>
      </div>

      {previewItem && previewSource ? (
        <figure className="caseCard__preview">
          <div className="caseCard__previewFrame">
            <img
              src={resolvePublicSrc(previewItem.src)}
              alt={previewItem.alt}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: project.gallery?.previewPosition }}
            />
          </div>
          <figcaption className="caseCard__previewCaption">
            <span>{previewItem.title}</span>
            <a href={previewSource.href} target="_blank" rel="noreferrer noopener">
              Source: {previewSource.label}
              <TbArrowUpRight aria-hidden="true" />
            </a>
          </figcaption>
        </figure>
      ) : null}

      <footer className="caseCard__footer">
        <div className="stack caseCard__stack" aria-label={`${project.name} technologies`}>
          {project.stack.slice(0, variant === "featured" ? 5 : 4).map((technology) => (
            <Tag key={technology} text={technology} />
          ))}
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="caseCard__link"
          aria-label={`Read the ${project.name} case study`}
        >
          <span>Read case study</span>
          <TbArrowRight aria-hidden="true" />
        </Link>
      </footer>
    </Card>
  );
};

export default CaseStudyCard;
