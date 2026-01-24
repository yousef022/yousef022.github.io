import { shipLog } from "../../features/shiplog/shiplog.data";
import { profile } from "../../features/profile/profile.data";
import ShipLogItem from "../../components/sections/ShipLogItem";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Divider from "../../components/ui/Divider";
import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";

const Home: React.FC = () => {
  useDocumentTitle(`${profile.name} · Portfolio`);

  const highlights = shipLog.slice(0, 4);

  return (
    <div className="grid" style={{ gap: 18 }}>
      {/* HERO */}
      <Card>
        <h1 className="h1">I build product-grade systems at startups.</h1>
        <p className="p">{profile.pitch}</p>

        <Divider />

        <div className="row" style={{ marginTop: 12 }}>
          <Button href={profile.links[0]?.href ?? "#"}>GitHub</Button>
          <Button href={profile.links[1]?.href ?? "#"}>LinkedIn</Button>
          {/* add resume later if you want */}
          <Button href="/#/projects">View Projects →</Button>
        </div>

        {/* metadata row (kept, but visually secondary) */}
        <div className="stack" style={{ marginTop: 10, opacity: 0.92 }}>
          <span className="kbd">Software Engineer · Startups · 2 YOE</span>
          <span className="kbd">{profile.location}</span>
        </div>
      </Card>

      {/* FEATURED PROJECTS (placeholder section) */}
      <div className="grid" style={{ gap: 12 }}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
          <h2 className="h2">Featured Projects</h2>
          <a href="/#/projects" className="p" style={{ fontSize: 14 }}>
            View all →
          </a>
        </div>

        <div className="grid2">
          <Card>
            <h3 className="h2" style={{ fontSize: 18 }}>JobHunt ProMatch</h3>
            <p className="p" style={{ marginTop: 6 }}>
              AI-driven freelancing platform focused on matching talent to gigs with scoring and workflow automation.
            </p>
            <div className="stack" style={{ marginTop: 10 }}>
              <span className="kbd">React</span>
              <span className="kbd">Node</span>
              <span className="kbd">AI Matching</span>
            </div>
          </Card>

          <Card>
            <h3 className="h2" style={{ fontSize: 18 }}>DeepCam / Device Workflows</h3>
            <p className="p" style={{ marginTop: 6 }}>
              Device onboarding + workflow services with strong boundaries, reliability, and secure operational patterns.
            </p>
            <div className="stack" style={{ marginTop: 10 }}>
              <span className="kbd">TypeScript</span>
              <span className="kbd">AWS</span>
              <span className="kbd">Reliability</span>
            </div>
          </Card>
        </div>
      </div>

      {/* SHIPPING HIGHLIGHTS */}
      <div className="grid" style={{ gap: 12 }}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
          <h2 className="h2">Shipping Highlights</h2>
          <a href="/#/" className="p" style={{ fontSize: 14 }}>
            {/* later you can make /ship-log route */}
          </a>
        </div>

        <div className="grid" style={{ gap: 12 }}>
          {highlights.map((item) => (
            <ShipLogItem key={`${item.date}-${item.title}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
