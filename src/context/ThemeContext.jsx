import { createContext, useContext, useEffect, useState } from "react";

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

const THEME_MODES = ["dark", "light", "system"];

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

  const theme = themeMode === "system" ? (systemDark ? "dark" : "light") : themeMode;
  const reducedMotion = manualReducedMotion || systemReducedMotion;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
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
  }, [theme, themeMode, textSize, highContrast, readableFont, underlineLinks, reducedMotion, manualReducedMotion]);

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
    themeMode,
    setThemeMode,
    toggleTheme: () => setThemeMode(theme === "dark" ? "light" : "dark"),
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
