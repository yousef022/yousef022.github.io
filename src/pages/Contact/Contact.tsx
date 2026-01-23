import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { profile } from "../../features/profile/profile.data";
import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";

const Contact: React.FC = () => {
  useDocumentTitle(`${profile.name} · Contact`);

  return (
    <Card>
      <h1 className="h1" style={{ fontSize: 34 }}>Contact</h1>
      <p className="p">Best way to reach me:</p>

      <div className="row" style={{ marginTop: 14 }}>
        {profile.links.map((l) => (
          <Button key={l.href} href={l.href}>
            {l.label}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default Contact;
