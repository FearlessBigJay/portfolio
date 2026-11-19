import { FaArrowRight } from "react-icons/fa";
import { projectPath, projects } from "../data/projects";

const NotFoundPage = () => (
  <section className="case-hero" aria-labelledby="nf-title">
    <div className="hero-glow" aria-hidden="true" />
    <div className="wrap text-center py-16">
      <p className="kicker justify-center">Error 404</p>
      <h1 id="nf-title" className="case-title">
        Page not found.
      </h1>
      <p className="lede mx-auto mt-4">
        This page doesn&apos;t exist, or it moved. Head back home, or open one of the case studies.
      </p>
      <a className="btn btn-primary mt-8" href="/">
        Back to BigJay&apos;s portfolio <FaArrowRight aria-hidden="true" className="nudge" />
      </a>
      <ul className="mt-10 flex flex-wrap justify-center gap-2 list-none p-0">
        {projects.map((project) => (
          <li key={project.slug}>
            <a className="chip" href={projectPath(project)}>
              {project.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default NotFoundPage;
