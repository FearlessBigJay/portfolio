import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes, FaMoon, FaSun, FaFileAlt, FaCog } from "react-icons/fa";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { portfolioProfile } from "../data/portfolioProfile";
import { sections, useActiveSection, useHydrated, useScrolledPast } from "../hooks/useSiteMotion";

const navLinks = sections.filter((s) => s.nav);

/** Theme toggle + settings panel opener. Shared by the desktop header and the mobile menu. */
export const DisplayControls = ({ showTheme = true, showSettings = true }) => {
  const { theme, toggleTheme, setSettingsOpen } = useTheme();
  // Before hydration, match the pre-rendered HTML (dark default); the real value follows a frame later.
  const hydrated = useHydrated();
  const isDark = !hydrated || theme === "dark";

  return (
    <div className="flex items-center gap-2">
      {showTheme && (
        <button
          type="button"
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          title={isDark ? "Light theme" : "Dark theme"}
        >
          {isDark ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
        </button>
      )}
      {showSettings && (
        <button
          type="button"
          className="icon-btn gear"
          onClick={() => setSettingsOpen(true)}
          aria-haspopup="dialog"
          aria-label="Display and accessibility settings"
          title="Display & accessibility"
        >
          <FaCog aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

/** Thin brand-yellow bar showing how far down the page you are. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
};

const Navbar = ({ page = "home" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const section = useActiveSection();
  // On a case-study page, "Work" is the current area of the site.
  const active = page === "home" ? section : page === "project" ? "projects" : null;
  const scrolled = useScrolledPast(12);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector("a")?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${isOpen ? "is-open" : ""}`}>
      <div className="wrap h-full flex items-center justify-between gap-4">
        <a href="/#hero" className="brand" onClick={() => setIsOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            BJ
          </span>
          <span className="brand-word">
            Big<span>Jay</span>
            <span className="sr-only"> (Jah&apos;swill Uchechi Emmanuel), home</span>
          </span>
        </a>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`/#${link.id}`} className="nav-link" aria-current={active === link.id ? "true" : undefined}>
                  {link.nav}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <DisplayControls />
          <a className="btn btn-ghost btn-sm" href={portfolioProfile.resume} target="_blank" rel="noopener">
            <FaFileAlt aria-hidden="true" /> Resume
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <DisplayControls showTheme={false} />
          <button
            ref={toggleRef}
            type="button"
            className="icon-btn"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>
      <ScrollProgress />

      {isOpen && (
        <nav id="mobile-nav" ref={menuRef} className="mobile-nav lg:hidden" aria-label="Mobile">
          <ul>
            {navLinks.map((link, index) => (
              <li key={link.id} style={{ "--i": index }}>
                <a
                  href={`/#${link.id}`}
                  className="nav-row"
                  aria-current={active === link.id ? "true" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {link.nav}
                  <span className="mono text-xs faint">{String(index + 1).padStart(2, "0")}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="status m-0">
              <span className="status-dot" aria-hidden="true" />
              {portfolioProfile.availability}
            </p>
            <DisplayControls showSettings={false} />
          </div>
          <p className="mono text-xs faint mt-6 mb-0">@{portfolioProfile.handle} everywhere</p>
          <a
            className="btn btn-primary w-full mt-4"
            href={portfolioProfile.resume}
            target="_blank"
            rel="noopener"
            onClick={() => setIsOpen(false)}
          >
            <FaFileAlt aria-hidden="true" /> View resume (PDF)
          </a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
