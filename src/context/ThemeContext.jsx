import { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { THEMES, findTheme } from "../data/themes";

const ThemeContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: preference just won't persist */
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const TEXT_SIZES = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Default" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra large" },
];

const THEME_MODES = [...THEMES.map((t) => t.id), "system"];

/** Resolves a saved mode ("forest", "system", ...) to a concrete theme. */
const resolveTheme = (mode, systemDark) =>
  findTheme(mode === "system" ? (systemDark ? "dark" : "light") : mode) || THEMES[0];

/** Writes theme attributes on <html> and the browser UI colour. */
const applyThemeAttrs = (resolved) => {
  const root = document.documentElement;
  root.setAttribute("data-theme", resolved.scheme);
  root.setAttribute("data-palette", resolved.id);
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute("content", resolved.metaColor));
};

const readChoice = (key, allowed, fallback) => {
  const saved = read(key);
  return allowed.includes(saved) ? saved : fallback;
};

const readFlag = (key) => read(key) === "true";

const media = (query) => (typeof window !== "undefined" ? window.matchMedia(query) : null);

/** Subscribes to a media query and returns whether it currently matches. */
const useMedia = (query) => {
  const [matches, setMatches] = useState(() => Boolean(media(query)?.matches));
  useEffect(() => {
    const list = media(query);
    const apply = () => setMatches(list.matches);
    list.addEventListener("change", apply);
    return () => list.removeEventListener("change", apply);
  }, [query]);
  return matches;
};

const READABLE_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap";

const loadReadableFont = () => {
  if (document.getElementById("readable-font")) return;
  const link = document.createElement("link");
  link.id = "readable-font";
  link.rel = "stylesheet";
  link.href = READABLE_FONT_HREF;
  document.head.appendChild(link);
};

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => readChoice("portfolio-theme", THEME_MODES, "dark"));
  const [textSize, setTextSize] = useState(() =>
    readChoice(
      "portfolio-textSize",
      TEXT_SIZES.map((s) => s.value),
      "md",
    ),
  );
  const [highContrast, setHighContrast] = useState(() => readFlag("portfolio-highContrast"));
  const [readableFont, setReadableFont] = useState(() => readFlag("portfolio-readableFont"));
  const [underlineLinks, setUnderlineLinks] = useState(() => readFlag("portfolio-underlineLinks"));
  const [manualReducedMotion, setManualReducedMotion] = useState(() => readFlag("portfolio-reducedMotion"));
  const [settingsOpen, setSettingsOpen] = useState(false);

  const systemDark = useMedia("(prefers-color-scheme: dark)");
  const systemReducedMotion = useMedia("(prefers-reduced-motion: reduce)");

  const resolved = resolveTheme(themeMode, systemDark);
  const theme = resolved.scheme;
  const reducedMotion = manualReducedMotion || systemReducedMotion;

  useEffect(() => {
    const root = document.documentElement;
    applyThemeAttrs(resolved);
    root.setAttribute("data-text", textSize);
    root.setAttribute("data-contrast", highContrast ? "high" : "normal");
    root.classList.toggle("readable-font", readableFont);
    root.classList.toggle("underline-links", underlineLinks);
    root.classList.toggle("reduced-motion", reducedMotion);
    root.classList.toggle("motion-ok", !reducedMotion);
    if (readableFont) loadReadableFont();

    write("portfolio-theme", themeMode);
    write("portfolio-textSize", textSize);
    write("portfolio-highContrast", String(highContrast));
    write("portfolio-readableFont", String(readableFont));
    write("portfolio-underlineLinks", String(underlineLinks));
    write("portfolio-reducedMotion", String(manualReducedMotion));
  }, [resolved, themeMode, textSize, highContrast, readableFont, underlineLinks, reducedMotion, manualReducedMotion]);

  /**
   * Switches theme with a circular reveal from `origin` (the click point) where the
   * View Transitions API exists and motion is allowed; otherwise switches instantly.
   */
  const changeTheme = (mode, origin) => {
    const root = document.documentElement;
    if (!document.startViewTransition || reducedMotion) {
      setThemeMode(mode);
      return;
    }
    root.style.setProperty("--vt-x", `${origin?.x ?? window.innerWidth / 2}px`);
    root.style.setProperty("--vt-y", `${origin?.y ?? 0}px`);
    root.classList.add("theme-vt");
    const transition = document.startViewTransition(() => {
      applyThemeAttrs(resolveTheme(mode, systemDark));
      flushSync(() => setThemeMode(mode));
    });
    transition.finished.finally(() => root.classList.remove("theme-vt"));
  };

  const resetSettings = () => {
    setThemeMode("dark");
    setTextSize("md");
    setHighContrast(false);
    setReadableFont(false);
    setUnderlineLinks(false);
    setManualReducedMotion(false);
  };

  const value = {
    theme,
    palette: resolved.id,
    themeMode,
    setThemeMode: changeTheme,
    toggleTheme: (origin) => changeTheme(theme === "dark" ? "light" : "dark", origin),
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    readableFont,
    setReadableFont,
    underlineLinks,
    setUnderlineLinks,
    reducedMotion,
    systemReducedMotion,
    manualReducedMotion,
    setManualReducedMotion,
    resetSettings,
    settingsOpen,
    setSettingsOpen,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
