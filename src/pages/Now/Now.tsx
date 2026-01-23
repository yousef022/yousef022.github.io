import Card from "../../components/ui/Card";
import { profile } from "../../features/profile/profile.data";
import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";

const Now: React.FC = () => {
  useDocumentTitle(`${profile.name} · Now`);

  return (
    <Card>
      <h1 className="h1" style={{ fontSize: 34 }}>Now</h1>
      <p className="p">What I’m building, improving, and learning right now.</p>

      <ul style={{ marginTop: 14, lineHeight: 1.7 }}>
        <li>Building: …</li>
        <li>Improving: …</li>
        <li>Learning: …</li>
      </ul>
    </Card>
  );
};

export default Now;
