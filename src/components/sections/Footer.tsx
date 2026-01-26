import { profile } from "../../features/profile/profile.data";

const Footer: React.FC = () => (
  <footer style={{ borderTop: "1px solid var(--border)" }}>
    <div className="bar">
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}
      >
        <span className="p">
          (c) {new Date().getFullYear()} {profile.name}
        </span>
        <div className="row">
          {profile.links.map((link) => (
            <a key={link.href} href={link.href} className="p">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
