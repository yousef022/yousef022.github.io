import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { TbMoon, TbSun } from "react-icons/tb";
import NavPill from "../ui/NavPill";

const TopNav: React.FC = () => {
  type Theme = "dark" | "light";

  const location = useLocation();
  const [navWrapEl, setNavWrapEl] = useState<HTMLElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    ({
      color: isActive ? "var(--text)" : "var(--muted)",
    }) as React.CSSProperties;

  const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/projects", label: "Work", end: false },
    { to: "/about", label: "About", end: false },
    { to: "/contact", label: "Contact", end: false },
  ] as const;

  return (
    <header style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="bar">
        <div className="container">
          <div className="navBar">
            <div className="navDesktop navWrap" ref={setNavWrapEl}>
              <nav className="nav">
                {navLinks.map((link) => (
                  <NavLink key={link.to} to={link.to} style={linkStyle} end={link.end}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <NavPill containerEl={navWrapEl} />
            </div>

            <button
              type="button"
              className="navMenuBtn"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span className="navMenuIcon" aria-hidden>
                <span />
                <span />
                <span />
              </span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="themeToggle"
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              aria-pressed={theme === "light"}
            >
              {theme === "dark" ? <TbSun aria-hidden="true" /> : <TbMoon aria-hidden="true" />}
            </button>
          </div>

          <div id="mobile-nav-panel" className={`navMobilePanel${mobileOpen ? " isOpen" : ""}`}>
            <div className="navMobilePanelInner">
              <nav className="nav nav--dropdown">
                {navLinks.map((link) => (
                  <NavLink key={`mobile-${link.to}`} to={link.to} end={link.end} style={linkStyle}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
