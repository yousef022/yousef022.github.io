import { useEffect, useState } from "react";
import NavPill from "../ui/NavPill";
import { NavLink } from "react-router-dom";
import { profile } from "../../features/profile/profile.data";

const TopNav: React.FC = () => {
  type Theme = "dark" | "light";

  const [navWrapEl, setNavWrapEl] = useState<HTMLElement | null>(null);

  const getInitialTheme = (): Theme => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;

    const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches ?? false;

    return prefersLight ? "light" : "dark";
  };

  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    ({
      color: isActive ? "var(--text)" : "var(--muted)",
    }) as React.CSSProperties;

  return (
    <header style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="bar">
        <div
          className="container"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="brand">{profile.name}</span>
          </div>
          <div
            className="navWrap"
            ref={setNavWrapEl}
          >
            <nav className="nav">
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

              <button
                type="button"
                onClick={toggleTheme}
                title="Toggle theme"
                aria-label="Toggle theme"
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid var(--border-strong)",
                  background: "var(--surface2)",
                  color: "inherit",
                  cursor: "pointer",
                  font: "inherit",
                }}
              >
                {theme === "dark" ? "Light ☀" : "Dark ☾"}
              </button>
            </nav>

            <NavPill containerEl={navWrapEl} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
