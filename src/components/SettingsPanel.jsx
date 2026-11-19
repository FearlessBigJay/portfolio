import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaMoon, FaSun, FaDesktop, FaUndo } from "react-icons/fa";
import { TEXT_SIZES, useTheme } from "../context/ThemeContext";

const themeOptions = [
  { value: "dark", label: "Dark", icon: FaMoon },
  { value: "light", label: "Light", icon: FaSun },
  { value: "system", label: "System", icon: FaDesktop },
];

const Switch = ({ id, label, hint, checked, onChange, disabled = false }) => (
  <div className="setting-row">
    <div className="min-w-0">
      <p id={`${id}-label`} className="m-0 font-semibold">
        {label}
      </p>
      <p id={`${id}-hint`} className="m-0 text-sm faint">
        {hint}
      </p>
    </div>
    <button
      type="button"
      role="switch"
      className="switch"
      aria-checked={checked}
      aria-labelledby={`${id}-label`}
      aria-describedby={`${id}-hint`}
      disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <span aria-hidden="true" />
    </button>
  </div>
);

/** Slide-in panel for display and accessibility preferences. Saved per browser. */
const SettingsPanel = () => {
  const {
    settingsOpen,
    setSettingsOpen,
    themeMode,
    setThemeMode,
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
  } = useTheme();
  const panelRef = useRef(null);
  const returnFocus = useRef(null);

  useEffect(() => {
    if (!settingsOpen) return undefined;
    returnFocus.current = document.activeElement;
    document.body.style.overflow = "hidden";
    // Wait a frame so the panel is in the DOM before moving focus.
    const frame = requestAnimationFrame(() => panelRef.current?.querySelector("button")?.focus());

    const onKey = (event) => {
      if (event.key === "Escape") {
        setSettingsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = [...panelRef.current.querySelectorAll("button:not([disabled]), input:not([disabled])")];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      returnFocus.current?.focus?.();
    };
  }, [settingsOpen, setSettingsOpen]);

  return (
    <AnimatePresence>
      {settingsOpen && (
        <>
          <motion.div
            className="settings-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSettingsOpen(false)}
          />
          <motion.aside
            ref={panelRef}
            className="settings-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
          >
            <div className="flex items-center justify-between gap-4 mb-2">
              <div>
                <p className="kicker !mb-1">Preferences</p>
                <h2 id="settings-title" className="text-2xl font-extrabold m-0">
                  Display &amp; accessibility
                </h2>
              </div>
              <button
                type="button"
                className="icon-btn"
                aria-label="Close settings"
                onClick={() => setSettingsOpen(false)}
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>
            <p className="text-sm muted m-0 mb-6">Saved in this browser only.</p>

            <fieldset className="setting-group">
              <legend>Theme</legend>
              <div className="segmented">
                {themeOptions.map(({ value, label, icon: Icon }) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="theme-mode"
                      value={value}
                      checked={themeMode === value}
                      onChange={() => setThemeMode(value)}
                    />
                    <span>
                      <Icon aria-hidden="true" size={13} /> {label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="setting-group">
              <legend>Text size</legend>
              <div className="segmented">
                {TEXT_SIZES.map(({ value, label }, i) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="text-size"
                      value={value}
                      checked={textSize === value}
                      onChange={() => setTextSize(value)}
                    />
                    <span>
                      <span aria-hidden="true" style={{ fontSize: `${0.8 + i * 0.14}rem`, fontWeight: 700 }}>
                        A
                      </span>
                      <span className="sr-only">{label}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="setting-group">
              <Switch
                id="contrast"
                label="High contrast"
                hint="Stronger text, borders, and colours."
                checked={highContrast}
                onChange={setHighContrast}
              />
              <Switch
                id="readable"
                label="Readable font"
                hint="Atkinson Hyperlegible, designed for low vision."
                checked={readableFont}
                onChange={setReadableFont}
              />
              <Switch
                id="underline"
                label="Underline links"
                hint="Make every link visible without colour."
                checked={underlineLinks}
                onChange={setUnderlineLinks}
              />
              <Switch
                id="motion"
                label="Reduce motion"
                hint={systemReducedMotion ? "On because of your system setting." : "Turn off animations and parallax."}
                checked={reducedMotion}
                disabled={systemReducedMotion}
                onChange={() => setManualReducedMotion(!manualReducedMotion)}
              />
            </div>

            <button type="button" className="btn btn-ghost w-full mt-2" onClick={resetSettings}>
              <FaUndo aria-hidden="true" /> Reset to defaults
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
