import { useEffect, useState } from "react";
import NavPill from "../ui/NavPill";
import { NavLink } from "react-router-dom";

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
        <div className="container navBar">
          <div className="navWrap" ref={setNavWrapEl}>
            <nav className="nav">
              <NavLink to="/" style={linkStyle} end>
                Home
              </NavLink>
              <NavLink to="/projects" style={linkStyle}>
                Projects
              </NavLink>
              <NavLink to="/about" style={linkStyle}>
                About
              </NavLink>
              <NavLink to="/contact" style={linkStyle}>
                Contact
              </NavLink>
            </nav>

            <NavPill containerEl={navWrapEl} />
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="themeToggle"
            title="Toggle theme"
            aria-label="Toggle theme"
            aria-pressed={theme === "light"}
          >
            <span className="themeToggleLabel">{theme === "dark" ? "Dark" : "Light"}</span>
            <span className="themeToggleTrack" aria-hidden="true">
              <span className="themeToggleThumb" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
