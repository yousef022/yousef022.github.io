import { shipLog } from "../../features/shiplog/shiplog.data";
import { profile } from "../../features/profile/profile.data";
import ShipLogItem from "../../components/sections/ShipLogItem";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Divider from "../../components/ui/Divider";
import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";

const Home: React.FC = () => {
  useDocumentTitle(`${profile.name} · Ship Log`);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card>
        <h1 className="h1">Startup Ship Log</h1>
        <p className="p">{profile.pitch}</p>

        <Divider />

        <div className="row">
          <Button href={profile.links[0]?.href ?? "#"}>GitHub</Button>
          <Button href={profile.links[1]?.href ?? "#"}>LinkedIn</Button>
          <Button href="/#/projects">Projects →</Button>
          <span className="kbd">{profile.location}</span>
        </div>
      </Card>

      <div className="grid" style={{ gap: 12 }}>
        {shipLog.map((item) => (
          <ShipLogItem key={`${item.date}-${item.title}`} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
