import Card from "../../components/ui/Card";
import { profile } from "../../features/profile/profile.data";
import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";

const About: React.FC = () => {
  useDocumentTitle(`${profile.name} · About`);

  return (
    <Card>
      <h1 className="h1" style={{ fontSize: 34 }}>About</h1>
      <p className="p">
        Write this like an internal intro doc: what you optimize for, how you think, what you’ve shipped.
      </p>

      <ul style={{ marginTop: 14, lineHeight: 1.7 }}>
        <li>Principles: KISS, DRY, clear boundaries</li>
        <li>Strengths: shipping + refactoring without breaking stuff</li>
        <li>Domains: startups, product delivery, reliability</li>
      </ul>
    </Card>
  );
};

export default About;
