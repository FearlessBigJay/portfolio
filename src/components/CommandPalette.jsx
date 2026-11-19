import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaSearch,
  FaHashtag,
  FaFolderOpen,
  FaPalette,
  FaFileAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaCog,
  FaCommentDots,
  FaCheck,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { portfolioProfile } from "../data/portfolioProfile";
import { projectPath, projects } from "../data/projects";
import { THEMES } from "../data/themes";
import { sections } from "../hooks/useSiteMotion";
import { OPEN_ASSISTANT_EVENT, OPEN_PALETTE_EVENT } from "../events";

const go = (href) => {
  window.location.href = href;
};

/**
 * Quick menu (Ctrl/⌘ + K): jump to a section or case study, switch theme,
 * copy the email address, open the resume or the assistant.
 * Accessible combobox pattern: the input owns focus, arrows move the active option.
 */
const CommandPalette = () => {
  const { setThemeMode, themeMode, setSettingsOpen } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const returnFocus = useRef(null);

  const items = useMemo(
    () => [
      ...sections.map((s) => ({
        id: `section-${s.id}`,
        group: "Go to",
        label: s.id === "hero" ? "Home" : s.label,
        icon: FaHashtag,
        run: () => go(`/#${s.id}`),
      })),
      ...projects.map((p) => ({
        id: `case-${p.slug}`,
        group: "Case studies",
        label: p.title,
        hint: p.tagline,
        icon: FaFolderOpen,
        run: () => go(projectPath(p)),
      })),
      {
        id: "assistant",
        group: "Actions",
        label: "Ask BigJay AI",
        icon: FaCommentDots,
        run: () => window.dispatchEvent(new Event(OPEN_ASSISTANT_EVENT)),
      },
      {
        id: "email",
        group: "Actions",
        label: "Copy email address",
        hint: portfolioProfile.email,
        icon: FaEnvelope,
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(portfolioProfile.email);
            setToast("Email address copied");
          } catch {
            go(`mailto:${portfolioProfile.email}`);
          }
        },
      },
      {
        id: "resume",
        group: "Actions",
        label: "Open resume (PDF)",
        icon: FaFileAlt,
        run: () => window.open(portfolioProfile.resume, "_blank", "noopener"),
      },
      {
        id: "github",
        group: "Actions",
        label: "GitHub",
        hint: `@${portfolioProfile.handle}`,
        icon: FaGithub,
        run: () => window.open(portfolioProfile.links.github, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        group: "Actions",
        label: "LinkedIn",
        hint: "in/fearlessbigjay",
        icon: FaLinkedin,
        run: () => window.open(portfolioProfile.links.linkedin, "_blank", "noopener"),
      },
      {
        id: "settings",
        group: "Actions",
        label: "Display & accessibility settings",
        icon: FaCog,
        run: () => setSettingsOpen(true),
      },
      ...THEMES.map((t) => ({
        id: `theme-${t.id}`,
        group: "Theme",
        label: `${t.label} theme`,
        hint: t.note,
        icon: FaPalette,
        current: themeMode === t.id,
        run: () => setThemeMode(t.id),
      })),
    ],
    [setSettingsOpen, setThemeMode, themeMode],
  );

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return items;
    return items.filter((item) => {
      const text = `${item.group} ${item.label} ${item.hint || ""}`.toLowerCase();
      return words.every((word) => text.includes(word));
    });
  }, [items, query]);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    returnFocus.current = document.activeElement;
    setQuery("");
    setActive(0);
    setToast("");
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(frame);
      returnFocus.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const runItem = (item) => {
    if (!item) return;
    if (!item.keepOpen) setOpen(false);
    item.run();
  };

  const onInputKey = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(results.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      runItem(results[active]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Tab") {
      event.preventDefault(); // focus stays in the dialog
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <div className="palette-layer">
          <motion.div
            className="settings-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Quick menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="palette-search">
              <FaSearch aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
                aria-autocomplete="list"
                aria-label="Search pages, case studies, themes and actions"
                placeholder="Search pages, case studies, themes…"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                autoComplete="off"
                spellCheck="false"
              />
              <kbd>Esc</kbd>
            </div>

            <ul id="palette-list" ref={listRef} role="listbox" className="palette-list" aria-label="Results">
              {results.length === 0 && <li className="palette-empty">No matches for “{query}”</li>}
              {results.map((item, index) => {
                const showGroup = item.group !== lastGroup;
                lastGroup = item.group;
                const Icon = item.icon;
                return (
                  <li key={item.id} role="presentation">
                    {showGroup && (
                      <p className="palette-group" aria-hidden="true">
                        {item.group}
                      </p>
                    )}
                    <div
                      id={`palette-${item.id}`}
                      role="option"
                      aria-selected={index === active}
                      data-index={index}
                      className="palette-item"
                      onMouseMove={() => setActive(index)}
                      onClick={() => runItem(item)}
                    >
                      <Icon aria-hidden="true" />
                      <span className="palette-label">{item.label}</span>
                      {item.hint && <span className="palette-hint">{item.hint}</span>}
                      {item.current && <FaCheck aria-label="current" className="palette-current" />}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="palette-foot" aria-hidden="true">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> move
              </span>
              <span>
                <kbd>Enter</kbd> open
              </span>
              <span className="ml-auto">
                <kbd>Ctrl</kbd>
                <kbd>K</kbd> toggle
              </span>
            </div>
            <p className="sr-only" role="status">
              {toast || `${results.length} results`}
            </p>
            {toast && <p className="palette-toast">{toast}</p>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
