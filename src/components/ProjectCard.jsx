import { useRef, useState } from "react";
import { FaArrowRight, FaGithub, FaLock } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { hasFinePointer } from "../hooks/useSiteMotion";
import { projectPath } from "../data/projects";

/** Live demo / source buttons. Accessible names include the project title. */
export const ProjectLinks = ({ project, size = "" }) => (
  <div className="flex flex-wrap gap-2">
    {project.link && (
      <a
        className={`btn btn-primary ${size}`}
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Live demo of ${project.title} (opens in a new tab)`}
      >
        Live demo <FaArrowRight aria-hidden="true" className="nudge -rotate-45" />
      </a>
    )}
    {project.repo ? (
      <a
        className={`btn btn-ghost ${size}`}
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Source code for ${project.title} on GitHub (opens in a new tab)`}
      >
        <FaGithub aria-hidden="true" /> Source
      </a>
    ) : (
      <span className="chip self-center">
        <FaLock aria-hidden="true" size={10} /> Source not public
      </span>
    )}
  </div>
);

const ProjectImage = ({ project, eager = false, className = "" }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`grid place-items-center w-full h-full ${className}`}>
        <span className="fallback-title" aria-hidden="true">
          {project.title}
        </span>
      </div>
    );
  }

  return (
    <img
      src={project.image}
      alt={project.imageAlt}
      width={project.width || 1200}
      height={project.height || 675}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
    />
  );
};

/**
 * Browser-window frame around a project screenshot. On fine pointers it tilts
 * a few degrees toward the cursor with a soft glare; otherwise it stays flat.
 */
export const TiltWindow = ({ project, eager = false }) => {
  const { reducedMotion } = useTheme();
  const ref = useRef(null);

  const onMove = (event) => {
    const el = ref.current;
    if (!el || reducedMotion || !hasFinePointer()) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    el.classList.add("is-tilting");
    el.style.setProperty("--ry", `${((x - 0.5) * 7).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - y) * 5).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("is-tilting");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const fitClass = { contain: "is-logo", illustration: "is-illustration" }[project.imageFit] || "";

  return (
    <div className="tilt-stage feature-media" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className="window">
        <div className="window-bar" aria-hidden="true">
          <span className="window-dots">
            <span />
            <span />
            <span />
          </span>
          <span className="window-url">{project.linkLabel || project.title}</span>
        </div>
        <div className={`window-screen ${fitClass}`}>
          <ProjectImage project={project} eager={eager} />
        </div>
      </div>
    </div>
  );
};

export const FeaturedProject = ({ project, index }) => (
  <article
    className={`feature ${index % 2 ? "is-flipped" : ""}`}
    aria-labelledby={`project-${project.slug}`}
    data-reveal
  >
    <TiltWindow project={project} />

    <div className="flex flex-col gap-5">
      <div>
        <p className="kicker !mb-3">
          <span className="idx">{String(index + 1).padStart(2, "0")}</span>
          {project.category}
        </p>
        <h3
          id={`project-${project.slug}`}
          tabIndex={-1}
          className="text-3xl md:text-4xl font-extrabold m-0 outline-none"
        >
          {project.title}
        </h3>
        <p className="mt-2 mb-0 text-lg font-medium">{project.tagline}</p>
      </div>

      <dl className="spec">
        <div>
          <dt>Problem</dt>
          <dd>{project.card.problem}</dd>
        </div>
        <div>
          <dt>What I built</dt>
          <dd>{project.card.built}</dd>
        </div>
      </dl>

      <ul className="flex flex-wrap gap-2 list-none p-0 m-0" aria-label={`Technologies used in ${project.title}`}>
        {project.tech.map((item, i) => (
          <li key={item} className="chip chip-pop" style={{ "--i": i }}>
            {item}
          </li>
        ))}
      </ul>

      <ProjectLinks project={project} />
      <a className="text-link case-link inline-flex items-center gap-2 self-start" href={projectPath(project)}>
        Read the {project.title} case study <FaArrowRight aria-hidden="true" className="nudge" />
      </a>
    </div>
  </article>
);
