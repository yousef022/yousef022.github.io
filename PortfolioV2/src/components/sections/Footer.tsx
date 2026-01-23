import { profile } from "../../features/profile/profile.data";

const Footer: React.FC = () => (
  <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
    <div className="container" style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <span className="p">© {new Date().getFullYear()} {profile.name}</span>
      <div className="row">
        {profile.links.map((l) => (
          <a key={l.href} href={l.href} className="p">
            {l.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
