import Card from "../../components/ui/Card";
import { profile } from "../../features/profile/profile.data";
import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";

const Now: React.FC = () => {
  useDocumentTitle(`${profile.name} - Now`);

  return (
    <Card>
      <h1 className="h1" style={{ fontSize: 34 }}>
        Now
      </h1>
      <p className="p">What I am building, improving, and learning right now.</p>

      <ul style={{ marginTop: 14, lineHeight: 1.7 }}>
        <li>Building: shipping new product features</li>
        <li>Improving: UI systems and performance</li>
        <li>Learning: deeper backend and systems design</li>
      </ul>
    </Card>
  );
};

export default Now;
