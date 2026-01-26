import Card from "../../components/ui/Card";
import Divider from "../../components/ui/Divider";
import Tag from "../../components/ui/Tag";
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

        <Divider />

        <h2 className="h2">How I work</h2>
        <ul style={{ marginTop: 10, lineHeight: 1.7 }}>
          <li className="p">I prioritize clarity, reliability, and delivery.</li>
          <li className="p">I ship quickly and keep systems maintainable.</li>
          <li className="p">I like tight feedback loops with product teams.</li>
        </ul>
      </Card>

      <div className="grid2">
        <Card>
          <h2 className="h2">Focus areas</h2>
          <div className="stack" style={{ marginTop: 10 }}>
            {profile.focus.map((item) => (
              <Tag key={item} text={item} />
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="h2">Recent experience</h2>
          <div style={{ marginTop: 10 }}>
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
        <h2 className="h2">Skills snapshot</h2>
        <div className="grid2" style={{ marginTop: 12 }}>
          {skillBuckets.map((bucket) => (
            <div key={bucket.title}>
              <div style={{ fontWeight: 700 }}>{bucket.title}</div>
              <div className="p" style={{ marginTop: 6 }}>
                {bucket.items.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default About;
