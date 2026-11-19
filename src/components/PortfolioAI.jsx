import { Fragment, useEffect, useRef, useState } from "react";
import {
  FaPaperPlane,
  FaTimes,
  FaFolderOpen,
  FaHashtag,
  FaPalette,
  FaFileAlt,
  FaEnvelope,
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaCog,
  FaRedo,
} from "react-icons/fa";
import BotFace from "./BotFace";
import { OPEN_ASSISTANT_EVENT } from "../events";
import { useTheme } from "../context/ThemeContext";
import { portfolioAssistantGreeting, portfolioProfile, portfolioStarterPrompts } from "../data/portfolioProfile";
import { findProject, projectPath } from "../data/projects";
import { findTheme } from "../data/themes";
import { knowledgeChunks } from "../data/assistantKnowledge";
import { sanitizeActions } from "../data/assistantActions";

const AI_ENDPOINT = "/.netlify/functions/portfolio-ai";
const STORAGE_KEY = "bigjay-chat";
const greeting = { id: 0, role: "assistant", content: portfolioAssistantGreeting };

const sectionLabels = {
  projects: "Selected work",
  about: "About",
  skills: "Stack",
  experience: "Experience",
  testimonials: "Notes",
  faq: "FAQ",
  contact: "Contact",
};

/** Label + icon for an action button. */
const describeAction = ({ type, value }) => {
  switch (type) {
    case "open_case_study":
      return { icon: FaFolderOpen, label: `${findProject(value)?.title} case study` };
    case "go_to_section":
      return { icon: FaHashtag, label: `Go to ${sectionLabels[value] || value}` };
    case "set_theme":
      return { icon: FaPalette, label: `Use ${findTheme(value)?.label} theme` };
    case "open_resume":
      return { icon: FaFileAlt, label: "Open resume" };
    case "email":
      return { icon: FaEnvelope, label: "Email him" };
    case "whatsapp":
      return { icon: FaWhatsapp, label: "WhatsApp" };
    case "open_github":
      return { icon: FaGithub, label: "GitHub" };
    case "open_linkedin":
      return { icon: FaLinkedin, label: "LinkedIn" };
    case "open_settings":
      return { icon: FaCog, label: "Display settings" };
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
// Offline fallback: score knowledge chunks by matching words.
// ---------------------------------------------------------------------------
const STOP = new Set(
  "a an and are about can could did do does for from get give has have he him his how i in is it its me my of on or please show tell that the this to was what when where which who why will with you your".split(
    " ",
  ),
);

const fallbackReply = (question, page) => {
  const words = question
    .toLowerCase()
    .replace(/[^a-z0-9.+# ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w));

  // "this project" on a case-study page means that project.
  const pageSlug = page.match(/^\/work\/([a-z0-9-]+)/)?.[1];
  if (pageSlug && /this (project|app|one)|it\b/.test(question.toLowerCase())) words.push(pageSlug);

  const scored = knowledgeChunks
    .map((chunk) => ({
      chunk,
      score: words.reduce((sum, w) => sum + (chunk.keys.includes(w) ? (chunk.id.startsWith("project") ? 3 : 2) : 0), 0),
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) {
    return {
      answer:
        "I couldn't find that in what I know about BigJay. Try asking about his projects, stack, experience, or how to contact him, or reach him directly.",
      actions: [{ type: "email", value: "" }],
      followUps: portfolioStarterPrompts.slice(0, 3),
    };
  }
  // Use the runner-up too when it scores as well and doesn't just repeat the first answer.
  const [first, second] = scored.map((s) => s.chunk);
  const repeats = second && first.text.includes(second.text.split(".")[0]);
  const top = second && scored[1].score >= scored[0].score && !repeats ? [first, second] : [first];
  return {
    answer: top.map((c) => c.text).join("\n\n"),
    actions: sanitizeActions(top.flatMap((c) => c.actions || [])),
    followUps: [],
  };
};

// ---------------------------------------------------------------------------
// Safe mini-markdown: **bold**, "- " bullets, paragraphs, and links.
// Builds React elements only (no innerHTML).
// ---------------------------------------------------------------------------
const LINK = /(https?:\/\/[^\s)]+|\/work\/[a-z0-9-]+\/?|\/#[a-z]+|[\w.+-]+@[\w-]+\.[\w.]+)/g;

const inline = (text, keyBase) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={`${keyBase}-b${i}`}>{part.slice(2, -2)}</strong>;
    return part.split(LINK).map((piece, j) => {
      const key = `${keyBase}-${i}-${j}`;
      if (!piece) return null;
      if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(piece)) {
        return (
          <a key={key} href={`mailto:${piece}`}>
            {piece}
          </a>
        );
      }
      if (/^https?:\/\//.test(piece)) {
        const href = piece.replace(/[.,;:]+$/, "");
        return (
          <Fragment key={key}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              {href.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
            {piece.slice(href.length)}
          </Fragment>
        );
      }
      if (/^\/(work|#)/.test(piece)) {
        return (
          <a key={key} href={piece}>
            {piece}
          </a>
        );
      }
      return <Fragment key={key}>{piece}</Fragment>;
    });
  });

const RichText = ({ text }) => {
  const blocks = text.trim().split(/\n{2,}/);
  return blocks.map((block, b) => {
    const lines = block.split("\n");
    if (lines.every((l) => /^\s*[-•*]\s+/.test(l))) {
      return (
        <ul key={b}>
          {lines.map((l, i) => (
            <li key={i}>{inline(l.replace(/^\s*[-•*]\s+/, ""), `${b}-${i}`)}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={b}>
        {lines.map((l, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {inline(l, `${b}-${i}`)}
          </Fragment>
        ))}
      </p>
    );
  });
};

const loadChat = () => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
    return Array.isArray(saved) && saved.length ? saved : [greeting];
  } catch {
    return [greeting];
  }
};

const PortfolioAI = () => {
  const { setThemeMode, setSettingsOpen } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([greeting]);
  const [offline, setOffline] = useState(false);
  const fabRef = useRef(null);
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const wasOpen = useRef(false);
  const loaded = useRef(false);

  // Restore the conversation (kept for this browser tab) after hydration.
  useEffect(() => {
    setMessages(loadChat());
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      /* storage unavailable */
    }
  }, [messages]);

  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    window.addEventListener(OPEN_ASSISTANT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else if (wasOpen.current) {
      fabRef.current?.focus();
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, isThinking, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (event) => event.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Grow the textarea with its content (up to a limit set in CSS).
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [input, isOpen]);

  const runAction = ({ type, value }) => {
    switch (type) {
      case "open_case_study":
        window.location.href = projectPath(findProject(value));
        break;
      case "go_to_section":
        window.location.href = `/#${value}`;
        break;
      case "set_theme":
        setThemeMode(value);
        break;
      case "open_resume":
        window.open(portfolioProfile.resume, "_blank", "noopener");
        break;
      case "email":
        window.location.href = `mailto:${portfolioProfile.email}`;
        break;
      case "whatsapp":
        window.open(portfolioProfile.links.whatsapp, "_blank", "noopener");
        break;
      case "open_github":
        window.open(portfolioProfile.links.github, "_blank", "noopener");
        break;
      case "open_linkedin":
        window.open(portfolioProfile.links.linkedin, "_blank", "noopener");
        break;
      case "open_settings":
        setIsOpen(false);
        setSettingsOpen(true);
        break;
      default:
    }
  };

  const send = async (question) => {
    const trimmed = question.trim();
    if (!trimmed || isThinking) return;

    const userMessage = { id: Date.now(), role: "user", content: trimmed };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setIsThinking(true);
    const page = window.location.pathname;

    let reply;
    try {
      const response = await fetch(AI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page,
          messages: history
            .filter((m) => m.id !== 0)
            .slice(-12)
            .map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.answer?.trim())
        throw new Error(data?.error || `AI request failed (${response.status})`);
      reply = { answer: data.answer.trim(), actions: sanitizeActions(data.actions), followUps: data.followUps || [] };
      setOffline(false);
    } catch (error) {
      console.warn("BigJay AI using local answers:", error.message);
      reply = fallbackReply(trimmed, page);
      setOffline(true);
    }

    setMessages((current) => [
      ...current,
      {
        id: Date.now() + 1,
        role: "assistant",
        content: reply.answer,
        actions: reply.actions,
        followUps: reply.followUps,
      },
    ]);
    setIsThinking(false);
  };

  const reset = () => {
    setMessages([greeting]);
    setOffline(false);
    inputRef.current?.focus();
  };

  const last = messages[messages.length - 1];
  const suggestions =
    messages.length < 3
      ? portfolioStarterPrompts
      : last?.role === "assistant" && !isThinking
        ? last.followUps || []
        : [];

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        className="assistant-fab"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="portfolio-assistant"
        aria-label={isOpen ? "Close BigJay AI" : "Ask BigJay AI about Jah'swill"}
      >
        {isOpen ? <FaTimes aria-hidden="true" /> : <BotFace />}
        <span className="label">{isOpen ? "Close" : "Ask BigJay AI"}</span>
      </button>

      {isOpen && (
        <section id="portfolio-assistant" className="assistant" role="dialog" aria-labelledby="assistant-title">
          <header
            className="flex items-start justify-between gap-3 px-4 py-3 border-b"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="flex items-center gap-3">
              <BotFace />
              <div>
                <h2
                  id="assistant-title"
                  className="text-base font-bold m-0"
                  style={{ fontFamily: "var(--font-body)", letterSpacing: 0 }}
                >
                  BigJay AI
                </h2>
                <p className="status m-0 mt-0.5 !text-[0.68rem]">
                  {offline ? "Offline mode · answers from site content" : "Ask anything about Jah'swill's work"}
                </p>
              </div>
            </div>
            <div className="flex gap-1.5">
              {messages.length > 1 && (
                <button
                  type="button"
                  className="icon-btn !w-9 !h-9"
                  onClick={reset}
                  aria-label="Start a new chat"
                  title="New chat"
                >
                  <FaRedo aria-hidden="true" size={11} />
                </button>
              )}
              <button
                type="button"
                className="icon-btn !w-9 !h-9"
                onClick={() => setIsOpen(false)}
                aria-label="Close BigJay AI"
              >
                <FaTimes aria-hidden="true" size={13} />
              </button>
            </div>
          </header>

          <div
            ref={logRef}
            className="flex-1 overflow-y-auto px-4 py-4 grid gap-3 content-start"
            role="log"
            aria-live="polite"
          >
            {messages.map((message) => (
              <Fragment key={message.id}>
                <div className={`bubble rich ${message.role === "user" ? "user-msg" : "assistant-msg"}`}>
                  <span className="sr-only">{message.role === "user" ? "You: " : "BigJay AI: "}</span>
                  {message.role === "user" ? <p>{message.content}</p> : <RichText text={message.content} />}
                </div>
                {message.actions?.length > 0 && (
                  <div className="assistant-actions">
                    {message.actions.map((action) => {
                      const meta = describeAction(action);
                      if (!meta) return null;
                      const Icon = meta.icon;
                      return (
                        <button
                          key={`${action.type}-${action.value}`}
                          type="button"
                          className="assistant-action"
                          onClick={() => runAction(action)}
                        >
                          <Icon aria-hidden="true" size={11} /> {meta.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </Fragment>
            ))}
            {isThinking && (
              <p className="bubble assistant-msg m-0 faint typing">
                <span className="sr-only">Thinking…</span>
                <i aria-hidden="true" />
                <i aria-hidden="true" />
                <i aria-hidden="true" />
              </p>
            )}
          </div>

          <div className="px-4 pb-4 pt-3 border-t" style={{ borderColor: "var(--line)" }}>
            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3" aria-label="Suggested questions">
                {suggestions.map((prompt) => (
                  <button key={prompt} type="button" className="prompt-chip" onClick={() => send(prompt)}>
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            <form
              className="flex items-end gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
            >
              <label htmlFor="assistant-input" className="sr-only">
                Your question (Enter to send, Shift+Enter for a new line)
              </label>
              <textarea
                ref={inputRef}
                id="assistant-input"
                rows={1}
                className="input assistant-input text-sm"
                value={input}
                maxLength={2000}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask anything, or paste a job description…"
                autoComplete="off"
              />
              <button
                type="submit"
                className="btn btn-primary !min-h-0 !w-11 !h-11 !p-0 shrink-0"
                aria-label="Send question"
                disabled={isThinking || !input.trim()}
              >
                <FaPaperPlane aria-hidden="true" size={13} />
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default PortfolioAI;
