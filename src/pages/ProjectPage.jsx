import { FaArrowLeft, FaArrowRight, FaGithub, FaTrophy, FaInfoCircle, FaFileAlt } from "react-icons/fa";
import { projectPath, projects } from "../data/projects";
import { portfolioProfile } from "../data/portfolioProfile";
import { ProjectLinks, TiltWindow } from "../components/ProjectCard";
import Magnetic from "../components/Magnetic";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The problem" },
  { id: "solution", label: "The solution" },
  { id: "features", label: "Core features" },
  { id: "stack", label: "Technical stack" },
  { id: "approach", label: "Engineering approach" },
  { id: "outcome", label: "Outcome & value" },
];

const Paragraphs = ({ items }) => items.map((text) => <p key={text.slice(0, 40)}>{text}</p>);

const Note = ({ children }) => (
  <aside className="case-note" role="note">
    <FaInfoCircle aria-hidden="true" />
    <p className="m-0">{children}</p>
  </aside>
);

const Chips = ({ items, label }) => (
  <ul className="flex flex-wrap gap-2 list-none p-0 m-0" aria-label={label}>
    {items.map((item) => (
      <li key={item} className="chip">
        {item}
      </li>
    ))}
  </ul>
);

const Section = ({ id, index, title, children }) => (
  <section id={id} className="case-section" aria-labelledby={`${id}-title`} data-reveal>
    <h2 id={`${id}-title`}>
      <span className="idx" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>{" "}
      {title}
    </h2>
    {children}
  </section>
);

const ProjectPage = ({ project }) => {
  const position = projects.indexOf(project);
  const prev = projects[(position - 1 + projects.length) % projects.length];
  const next = projects[(position + 1) % projects.length];
  const stack = project.stack || project.tech;
  const backendNote = project.backendStack && project.note;
  const s = (id) => sections.findIndex((section) => section.id === id);

  return (
    <article className="case" aria-labelledby="case-title">
      <header className="case-hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="rise" style={{ "--d": "0s" }}>
            <ol className="crumbs">
              <li>
                <a href="/">BigJay</a>
              </li>
              <li>
                <a href="/#projects">Work</a>
              </li>
              <li aria-current="page">{project.title}</li>
            </ol>
          </nav>

          <p className="kicker mt-8 rise" style={{ "--d": "0.05s" }}>
            <span className="idx">
              {String(position + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            {project.category}
          </p>
          <h1 id="case-title" className="case-title">
            <span className="word-mask">
              <span className="word-in" style={{ "--d": "0.1s" }}>
                {project.title}
              </span>
            </span>
          </h1>
          <p className="case-tagline rise" style={{ "--d": "0.3s" }}>
            {project.tagline}
          </p>

          {project.award && (
            <p className="award rise" style={{ "--d": "0.4s" }}>
              <FaTrophy aria-hidden="true" /> {project.award}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3 rise" style={{ "--d": "0.45s" }}>
            <ProjectLinks project={project} />
            {project.repos
              ?.filter((r) => r.url !== project.repo)
              .map((r) => (
                <a
                  key={r.url}
                  className="btn btn-ghost"
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} ${r.label.toLowerCase()} source on GitHub (opens in a new tab)`}
                >
                  <FaGithub aria-hidden="true" /> {r.label}
                </a>
              ))}
          </div>
        </div>
      </header>

      <div className="wrap rise" style={{ "--d": "0.55s" }}>
        <TiltWindow project={project} eager />
      </div>

      <div className="wrap case-grid">
        <aside className="case-aside" aria-label="Project summary">
          <dl className="case-facts">
            <div>
              <dt>Category</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>Live demo</dt>
              <dd>
                {project.link ? (
                  <a className="text-link" href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.linkLabel}
                  </a>
                ) : (
                  "No public demo"
                )}
              </dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>
                {project.repos ? (
                  project.repos.map((r) => (
                    <a key={r.url} className="text-link block" href={r.url} target="_blank" rel="noopener noreferrer">
                      {r.label} on GitHub
                    </a>
                  ))
                ) : project.repo ? (
                  <a className="text-link" href={project.repo} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                ) : (
                  "Private repository"
                )}
              </dd>
            </div>
          </dl>

          <nav aria-labelledby="toc-title" className="case-toc">
            <p id="toc-title" className="mono text-xs faint uppercase tracking-wider m-0 mb-3">
              On this page
            </p>
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="case-body">
          <Section id="overview" index={s("overview")} title="Overview">
            <Paragraphs items={project.overview} />
          </Section>

          <Section id="problem" index={s("problem")} title="The problem">
            <p>{project.problem.intro}</p>
            <ul className="bullets">
              {project.problem.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Section>

          <Section id="solution" index={s("solution")} title="The solution">
            <Paragraphs items={project.solution} />
            {project.note && !backendNote && <Note>{project.note}</Note>}
          </Section>

          <Section id="features" index={s("features")} title="Core features">
            {project.featuresNote && <p className="muted">{project.featuresNote}</p>}
            <ul className="feature-grid">
              {project.features.map((feature, i) => (
                <li key={feature} style={{ "--i": i }}>
                  {feature}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="stack" index={s("stack")} title="Technical stack">
            {project.backendStack && <h3>Frontend</h3>}
            <Chips items={stack} label={`Technologies used in ${project.title}`} />
            {project.backendStack && (
              <>
                <h3>Companion API</h3>
                <Chips items={project.backendStack} label={`Backend technologies for ${project.title}`} />
              </>
            )}
            {backendNote && <Note>{project.note}</Note>}
          </Section>

          <Section id="approach" index={s("approach")} title="Engineering approach">
            <Paragraphs items={project.approach} />
            <h3>Key considerations</h3>
            <ul className="bullets">
              {project.considerations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section id="outcome" index={s("outcome")} title="Outcome & value">
            <Paragraphs items={project.outcome} />
            <h3>Highlights</h3>
            <Chips items={project.highlights} label={`${project.title} highlights`} />
          </Section>
        </div>
      </div>

      <nav className="wrap case-pager" aria-label="More case studies">
        <a href={projectPath(prev)} className="pager-card panel" rel="prev">
          <span className="mono text-xs faint uppercase">
            <FaArrowLeft aria-hidden="true" className="inline" size={10} /> Previous
          </span>
          <strong>{prev.title}</strong>
          <span className="text-sm muted">{prev.tagline}</span>
        </a>
        <a href={projectPath(next)} className="pager-card panel text-right" rel="next">
          <span className="mono text-xs faint uppercase">
            Next <FaArrowRight aria-hidden="true" className="inline" size={10} />
          </span>
          <strong>{next.title}</strong>
          <span className="text-sm muted">{next.tagline}</span>
        </a>
      </nav>

      <section className="wrap case-cta" aria-labelledby="cta-title" data-reveal>
        <div className="panel p-8 md:p-12 text-center">
          <p className="kicker justify-center">Work with BigJay</p>
          <h2 id="cta-title" className="section-title">
            Have something like {project.title} in mind?
          </h2>
          <p className="lede mx-auto">
            I build full-stack products from idea to deployment. {portfolioProfile.availability}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <a className="btn btn-primary" href="/#contact">
                Start a conversation <FaArrowRight aria-hidden="true" className="nudge" />
              </a>
            </Magnetic>
            <a className="btn btn-ghost" href="/#projects">
              All projects
            </a>
            <a className="btn btn-ghost" href={portfolioProfile.resume} target="_blank" rel="noopener">
              <FaFileAlt aria-hidden="true" /> Resume
            </a>
          </div>
        </div>
      </section>
    </article>
  );
};

export default ProjectPage;
