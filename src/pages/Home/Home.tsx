import Card from "../../components/ui/Card";
import Tag from "../../components/ui/Tag";
import Section from "../../components/ui/Section";
import SectionHeader from "../../components/ui/SectionHeader";
import CaseStudyCard from "../../components/sections/caseStudies/CaseStudyCard";
import ExperienceTimelineSection from "../../components/sections/experience/ExperienceTimelineSection";
import HomeHero from "../../components/sections/home/HeroHome";
import SkillsGrid from "../../components/sections/SkillsGrid";
import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";
import { profile } from "../../features/profile/profile.data";
import { caseStudies } from "../../features/caseStudies/caseStudy.data";
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
        <SectionHeader title="Case studies" actionLabel="View all" actionTo="/projects" />

        <div className="grid2">
          {cs.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} project={caseStudy} />
          ))}
        </div>
      </Section>

      <Section className="grid">
        <SectionHeader title="Experience" actionLabel="Full timeline" actionTo="/about" />

        <ExperienceTimelineSection
          items={experiences}
          limit={3}
          timelineProps={{ stickyTitle: false, stickyTopPx: 110, titleWidthPx: 260 }}
        />
      </Section>

      <Section className="grid">
        <SectionHeader title="Skills" />
        <SkillsGrid buckets={skillBuckets} />
      </Section>

      <Section className="grid">
        <SectionHeader title="Education" />
        <div className="homeEducation">
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

      <Section className="grid">
        <SectionHeader title="Contact" />
        <div className="homeContact">
          <p className="p homeContact__copy">
            Open to startup teams, freelance work, and product-focused roles.
          </p>
          <div className="homeContact__links">
            {profile.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="homeContact__link"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Home;
