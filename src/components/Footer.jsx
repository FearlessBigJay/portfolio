import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { portfolioProfile } from "../data/portfolioProfile";
import { sections } from "../hooks/useSiteMotion";
import { projectPath, projects } from "../data/projects";
import LocalTime from "./LocalTime";

const socials = [
  { icon: FaGithub, href: portfolioProfile.links.github, label: "GitHub" },
  { icon: FaLinkedin, href: portfolioProfile.links.linkedin, label: "LinkedIn" },
  { icon: FaWhatsapp, href: portfolioProfile.links.whatsapp, label: "WhatsApp" },
  { icon: FaEnvelope, href: `mailto:${portfolioProfile.email}`, label: "Email" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t pt-12 pb-28" style={{ borderColor: "var(--line)" }}>
      <div className="wrap grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
        <div>
          <p className="brand m-0">
            <span className="brand-mark" aria-hidden="true">
              BJ
            </span>
            <span className="brand-word">
              Big<span>Jay</span>
            </span>
          </p>
          <p className="mt-3 mb-0 text-sm max-w-sm">
            {portfolioProfile.name} <span className="faint">· @{portfolioProfile.handle}</span>
          </p>
          <p className="mt-2 mb-0 text-sm muted max-w-sm">{portfolioProfile.title}</p>
        </div>

        <nav aria-labelledby="footer-site">
          <p id="footer-site" className="mono text-xs faint uppercase tracking-wider m-0 mb-3">
            Site
          </p>
          <ul className="grid gap-2 list-none p-0 m-0 text-sm">
            {sections
              .filter((s) => s.nav)
              .map((s) => (
                <li key={s.id}>
                  <a className="text-link" href={`/#${s.id}`}>
                    {s.label}
                  </a>
                </li>
              ))}
            <li>
              <a className="text-link" href={portfolioProfile.resume} target="_blank" rel="noopener">
                Resume (PDF)
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-cases">
          <p id="footer-cases" className="mono text-xs faint uppercase tracking-wider m-0 mb-3">
            Case studies
          </p>
          <ul className="grid gap-2 list-none p-0 m-0 text-sm">
            {projects.map((project) => (
              <li key={project.slug}>
                <a className="text-link" href={projectPath(project)}>
                  {project.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-3 content-start">
          <p className="status m-0">
            <span className="status-dot" aria-hidden="true" />
            {portfolioProfile.availability}
          </p>
          <p className="status m-0">
            {portfolioProfile.city} · <LocalTime />
          </p>
          <ul className="flex gap-2 list-none p-0 m-0 mt-2">
            {socials.map(({ icon: Icon, href, label }) => {
              const external = !href.startsWith("mailto:");
              return (
                <li key={label}>
                  <a
                    className="icon-btn"
                    href={href}
                    aria-label={label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer me" : undefined}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="wrap mt-14">
        <p className="footer-wordmark" aria-hidden="true">
          BigJay
        </p>
      </div>
      <p className="wrap mt-6 mb-0 text-xs faint">
        © {year} BigJay ({portfolioProfile.name}). Built with React, Vite, and Tailwind CSS.
      </p>
    </footer>
  );
};

export default Footer;
