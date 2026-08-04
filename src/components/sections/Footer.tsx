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
      </div>
    </div>
  </footer>
);

export default Footer;
