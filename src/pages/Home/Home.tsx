import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Tag from "../../components/ui/Tag";
import Button from "../../components/ui/Button";
import Section from "../../components/ui/Section";
import CaseStudyCard from "../../components/sections/CaseStudyCard";
import ExperienceTimelineSection from "../../components/sections/experience/ExperienceTimelineSection";
import HomeHero from "../../components/sections/home/HeroHome";
import SkillsGrid from "../../components/sections/SkillsGrid";
import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";
import { profile } from "../../features/profile/profile.data";
import { caseStudies} from "../../features/caseStudies/caseStudy.data";
import { experiences } from "../../features/experience/experience.data";
import { skillBuckets } from "../../features/skills/skills.data";
import { education } from "../../features/education/education.data";

const Home: React.FC = () => {
  useDocumentTitle(`${profile.name} - Portfolio`);
  const cs = caseStudies.filter((c) => c.featured).slice(0, 2);

  return (
    <div className="sectionLis">
      <HomeHero />

      <Section className="grid">
        <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
          <h2 className="h2">Case studies</h2>
          <Link to="/projects" className="p" style={{ fontSize: 14 }}>
            View all
          </Link>
        </div>

        <div className="grid2">
          {cs.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} project={caseStudy} />
          ))}
        </div>
      </Section>

      <Section className="grid">
        <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
          <h2 className="h2">Experience</h2>
          <Link to="/about" className="p" style={{ fontSize: 14 }}>
            Full timeline
          </Link>
        </div>

        <ExperienceTimelineSection
          items={experiences}
          limit={3}
          timelineProps={{ stickyTitle: false, stickyTopPx: 110, titleWidthPx: 260 }}
        />
      </Section>

      <Section className="grid">
        <h2 className="h2">Skills</h2>
        <SkillsGrid buckets={skillBuckets} />
      </Section>

      <Section className="grid">
        <h2 className="h2">Education</h2>
        <div className="grid2">
          {education.map((item) => (
            <Card key={item.school} className="eduCard">
              <div className="row eduHeader">
                <div>
                  <h3 className="eduTitle">{item.school}</h3>
                  <p className="p eduProgram">{item.program}</p>
                </div>
                <span className="kbd eduPeriod">{item.period}</span>
              </div>
              <div className="eduLabel">Key focus</div>
              <div className="eduTags">
                {item.highlights.map((highlight) => (
                  <Tag key={highlight} text={highlight} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <Card>
          <h2 className="h2">Let's build something together</h2>
          <p className="p" style={{ marginTop: 8 }}>
            Open to startup teams, freelancing, and product-focused roles.
          </p>
          <div className="row" style={{ marginTop: 12 }}>
            {profile.links.map((link) => (
              <Button key={link.href} href={link.href}>
                {link.label}
              </Button>
            ))}
          </div>
        </Card>
      </Section>
    </div>
  );
};

export default Home;
