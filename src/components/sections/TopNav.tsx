import { NavLink } from "react-router-dom";
import { profile } from "../../features/profile/profile.data";

const TopNav: React.FC = () => {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    ({
      padding: "10px 12px",
      borderRadius: 12,
      textDecoration: "none",
      border: `1px solid ${isActive ? "rgba(255,255,255,0.18)" : "transparent"}`,
      background: isActive ? "rgba(255,255,255,0.04)" : "transparent",
      color: isActive ? "rgba(231,234,241,1)" : "rgba(167,176,193,1)",
    }) as React.CSSProperties;

  return (
    <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="kbd">{profile.role}</span>
          <span style={{ color: "rgba(231,234,241,0.9)" }}>{profile.name}</span>
        </div>

        <nav style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <NavLink to="/" style={linkStyle} end>
            Ship Log
          </NavLink>
          <NavLink to="/projects" style={linkStyle}>
            Projects
          </NavLink>
          <NavLink to="/now" style={linkStyle}>
            Now
          </NavLink>
          <NavLink to="/about" style={linkStyle}>
            About
          </NavLink>
          <NavLink to="/contact" style={linkStyle}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default TopNav;
