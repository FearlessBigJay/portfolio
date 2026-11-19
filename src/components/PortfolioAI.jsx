import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaTimes, FaCommentDots } from "react-icons/fa";
import {
  portfolioAssistantGreeting,
  portfolioProfile,
  portfolioProjects,
  portfolioStarterPrompts,
} from "../data/portfolioProfile";

const AI_ENDPOINT = "/.netlify/functions/portfolio-ai";
const greeting = { id: 0, role: "assistant", content: portfolioAssistantGreeting };

/** Local answers used when the live endpoint is unavailable. Uses the same data as the visible site. */
const fallbackAnswer = (question) => {
  const text = question.toLowerCase();
  const project = portfolioProjects.find((p) => text.includes(p.name.toLowerCase()));

  if (project) {
    const links = [project.url && `Live: ${project.url}`, project.repo && `Code: ${project.repo}`]
      .filter(Boolean)
      .join("\n");
    return `${project.name}: ${project.summary}\nStack: ${project.tech}${links ? `\n${links}` : ""}`;
  }
  if (/contact|email|phone|whatsapp|reach|hire/.test(text)) {
    return `Email: ${portfolioProfile.email}\nWhatsApp: ${portfolioProfile.phone}\nLinkedIn: ${portfolioProfile.links.linkedin}\nGitHub: ${portfolioProfile.links.github}\n${portfolioProfile.availability}.`;
  }
  if (/project|built|build|work|portfolio/.test(text) && !/experience|career/.test(text)) {
    const featured = portfolioProjects.filter((p) => p.featured).map((p) => p.name);
    const rest = portfolioProjects.filter((p) => !p.featured).map((p) => p.name);
    return `Selected work: ${featured.join(", ")}. Also: ${rest.join(", ")}. Ask about any one of them by name.`;
  }
  if (/skill|stack|tech|language|framework/.test(text)) return portfolioProfile.skills;
  if (/experience|job|career|resume|cv|role/.test(text)) {
    return `${portfolioProfile.experience}\nResume: ${portfolioProfile.site}${portfolioProfile.resume}`;
  }
  if (/education|school|study|certif|altschool/.test(text)) {
    return `${portfolioProfile.education}\nCertificates: ${portfolioProfile.certifications}.`;
  }
  if (/availab|remote|freelance|contract/.test(text)) return `${portfolioProfile.availability}.`;
  if (/who|about|jah'?swill|big ?jay|fearless|tell me/.test(text)) return portfolioProfile.summary;
  return "I can answer questions about Jah'swill's projects, stack, experience, and contact details. Try one of the suggestions below.";
};

const PortfolioAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([greeting]);
  const [offline, setOffline] = useState(false);
  const fabRef = useRef(null);
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const wasOpen = useRef(false);

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

  const send = async (question) => {
    const trimmed = question.trim();
    if (!trimmed || isThinking) return;

    const userMessage = { id: Date.now(), role: "user", content: trimmed };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setIsThinking(true);

    let content = "";
    try {
      const response = await fetch(AI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: trimmed,
          messages: history
            .filter((m) => m.id !== 0)
            .slice(-10)
            .map(({ role, content: text }) => ({ role, content: text })),
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.answer?.trim()) throw new Error(data?.error || "AI request failed");
      content = data.answer.trim();
      setOffline(false);
    } catch (error) {
      console.warn("Portfolio assistant using local answers:", error.message);
      content = fallbackAnswer(trimmed);
      setOffline(true);
    }

    setMessages((current) => [...current, { id: Date.now() + 1, role: "assistant", content }]);
    setIsThinking(false);
  };

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        className="assistant-fab"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="portfolio-assistant"
        aria-label={isOpen ? "Close portfolio assistant" : "Ask the portfolio assistant"}
      >
        {isOpen ? <FaTimes aria-hidden="true" /> : <FaCommentDots aria-hidden="true" />}
        <span className="label">{isOpen ? "Close" : "Ask BigJay AI"}</span>
      </button>

      {isOpen && (
        <section id="portfolio-assistant" className="assistant" role="dialog" aria-labelledby="assistant-title">
          <header
            className="flex items-start justify-between gap-3 px-4 py-3 border-b"
            style={{ borderColor: "var(--line)" }}
          >
            <div>
              <h2
                id="assistant-title"
                className="text-base font-bold m-0"
                style={{ fontFamily: "var(--font-body)", letterSpacing: 0 }}
              >
                BigJay assistant
              </h2>
              <p className="status m-0 mt-0.5 !text-[0.68rem]">
                {offline ? "Offline mode · answers from site content" : "Answers about Jah'swill's work"}
              </p>
            </div>
            <button
              type="button"
              className="icon-btn !w-9 !h-9"
              onClick={() => setIsOpen(false)}
              aria-label="Close portfolio assistant"
            >
              <FaTimes aria-hidden="true" size={13} />
            </button>
          </header>

          <div
            ref={logRef}
            className="flex-1 overflow-y-auto px-4 py-4 grid gap-3 content-start"
            role="log"
            aria-live="polite"
          >
            {messages.map((message) => (
              <p key={message.id} className={`bubble m-0 ${message.role === "user" ? "user-msg" : "assistant-msg"}`}>
                <span className="sr-only">{message.role === "user" ? "You: " : "Assistant: "}</span>
                {message.content}
              </p>
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
            {messages.length < 3 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {portfolioStarterPrompts.map((prompt) => (
                  <button key={prompt} type="button" className="prompt-chip" onClick={() => send(prompt)}>
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            <form
              className="flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
            >
              <label htmlFor="assistant-input" className="sr-only">
                Your question
              </label>
              <input
                ref={inputRef}
                id="assistant-input"
                className="input !rounded-full !py-2.5 text-sm"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about projects, stack, experience…"
                autoComplete="off"
              />
              <button
                type="submit"
                className="btn btn-primary !min-h-0 !w-11 !h-11 !p-0 shrink-0"
                aria-label="Send question"
                disabled={isThinking}
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
