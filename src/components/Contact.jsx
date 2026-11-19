import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp, FaCopy, FaCheck } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { portfolioProfile } from "../data/portfolioProfile";

const FORM_ENDPOINT = "https://formspree.io/f/xnnplpjz";

const channels = [
  { icon: FaEnvelope, label: "Email", value: portfolioProfile.email, href: `mailto:${portfolioProfile.email}` },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: portfolioProfile.phone,
    href: portfolioProfile.links.whatsapp,
    external: true,
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "in/fearlessbigjay",
    href: portfolioProfile.links.linkedin,
    external: true,
  },
  { icon: FaGithub, label: "GitHub", value: "FearlessBigJay", href: portfolioProfile.links.github, external: true },
];

const Contact = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioProfile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${portfolioProfile.email}`;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Form request failed: ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="wrap grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16">
        <div>
          <SectionHeading
            id="contact-heading"
            index="07"
            eyebrow="Contact"
            title="Tell me what you want to build."
            className="!mb-8"
          >
            A role, a product idea, or a collaboration. I read every message, and email or WhatsApp is the fastest way
            to reach me.
          </SectionHeading>

          <p className="status mb-6">
            <span className="status-dot" aria-hidden="true" />
            {portfolioProfile.availability} · {portfolioProfile.location}
          </p>

          <p className="text-sm muted mb-4">
            Find me as <strong style={{ color: "var(--signal)" }}>@{portfolioProfile.handle}</strong> on GitHub and
            LinkedIn.
          </p>
          <ul className="grid gap-2 list-none p-0 m-0" data-reveal>
            {channels.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer me" : undefined}
                  className="panel flex items-center gap-4 px-4 py-3 transition-colors hover:border-[var(--signal)]"
                >
                  <Icon aria-hidden="true" style={{ color: "var(--signal)" }} />
                  <span className="mono text-xs faint w-20 shrink-0 uppercase">{label}</span>
                  <span className="font-medium truncate">{value}</span>
                </a>
              </li>
            ))}
          </ul>

          <button type="button" className="btn btn-ghost btn-sm mt-4" onClick={copyEmail}>
            {copied ? <FaCheck aria-hidden="true" /> : <FaCopy aria-hidden="true" />}
            {copied ? "Email copied" : "Copy email address"}
          </button>
          <span className="sr-only" role="status">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </div>

        <div className="panel p-6 md:p-8" data-reveal>
          {status === "sent" ? (
            <div role="status" className="py-8">
              <h3 className="text-2xl font-bold m-0 mb-2">Message sent</h3>
              <p className="muted m-0">Thank you. I&apos;ll reply to the email address you used.</p>
              <button type="button" className="btn btn-ghost mt-6" onClick={() => setStatus("idle")}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <h3 className="text-xl font-bold m-0">Send a message</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="field">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="contact-subject">
                  Subject <span className="faint font-normal">(optional)</span>
                </label>
                <input id="contact-subject" name="subject" type="text" placeholder="Project, role, or collaboration" />
              </div>
              <div className="field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  required
                  placeholder="What are you working on?"
                />
              </div>
              {status === "error" && (
                <p role="alert" className="m-0" style={{ color: "var(--coral)" }}>
                  The message didn&apos;t send. Please email me directly at{" "}
                  <a className="underline" href={`mailto:${portfolioProfile.email}`}>
                    {portfolioProfile.email}
                  </a>
                  .
                </p>
              )}
              <button className="btn btn-primary w-full" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
