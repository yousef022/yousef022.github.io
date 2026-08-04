import Card from "../../components/ui/Card";
import SectionHeader from "../../components/ui/SectionHeader";
import Tag from "../../components/ui/Tag";
import SkillsGrid from "../../components/sections/SkillsGrid";
import { profile } from "../../features/profile/profile.data";
import { experiences } from "../../features/experience/experience.data";
import { skillBuckets } from "../../features/skills/skills.data";
import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";

const About: React.FC = () => {
  useDocumentTitle(`${profile.name} - About`);

  return (
    <div className="grid" style={{ gap: 14 }}>
      <Card>
        <h1 className="h1" style={{ fontSize: 34 }}>
          About
        </h1>
        <p className="p">{profile.pitch}</p>

        <SectionHeader className="sectionHeader--inset" title="How I work" />
        <ul style={{ marginTop: 12, lineHeight: 1.7 }}>
          <li className="p">I prioritize clarity, reliability, and delivery.</li>
          <li className="p">I ship quickly and keep systems maintainable.</li>
          <li className="p">I like tight feedback loops with product teams.</li>
        </ul>
      </Card>

      <div className="grid2">
        <Card>
          <SectionHeader title="Focus areas" />
          <div className="stack" style={{ marginTop: 12 }}>
            {profile.focus.map((item) => (
              <Tag key={item} text={item} />
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Recent experience" />
          <div style={{ marginTop: 12 }}>
            {experiences.slice(0, 2).map((item) => (
              <div key={item.company} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 700 }}>{item.company}</div>
                <div className="p" style={{ fontSize: 12 }}>
                  {item.role} | {item.period}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionHeader title="Skills snapshot" />
        <div style={{ marginTop: 12 }}>
          <SkillsGrid buckets={skillBuckets} />
        </div>
      </Card>
    </div>
  );
};

export default About;
