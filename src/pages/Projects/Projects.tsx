import { useEffect } from "react";
import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";
import { profile } from "../../features/profile/profile.data";
import { selectAllCaseStudies } from "../../features/caseStudies/caseStudy.selectors";
import CaseStudyCard from "../../components/sections/caseStudies/CaseStudyCard";

const Projects: React.FC = () => {
  useDocumentTitle(`${profile.name} - Product Work`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [flagshipCaseStudy, ...supportingCaseStudies] = selectAllCaseStudies();

  return (
    <div className="workPage">
      <header className="workPage__header">
        <h1 className="workPage__title">Product work</h1>
        <p className="workPage__intro">
          Products I have shipped across browser, Android, backend automation, and identity verification.
        </p>
      </header>

      <div className="caseStudyShowcase caseStudyShowcase--all">
        {flagshipCaseStudy ? (
          <CaseStudyCard project={flagshipCaseStudy} variant="featured" />
        ) : null}

        <div className="caseStudySupporting caseStudySupporting--all">
          {supportingCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} project={caseStudy} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
