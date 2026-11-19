import { useRef, useState } from "react";
import { FaGithub, FaChevronDown } from "react-icons/fa";
import { INITIAL_PROJECTS, projects } from "../data/projects";
import { portfolioProfile } from "../data/portfolioProfile";
import SectionHeading from "./SectionHeading";
import { FeaturedProject } from "./ProjectCard";

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const toggleRef = useRef(null);
  const visible = showAll ? projects : projects.slice(0, INITIAL_PROJECTS);
  const hiddenCount = projects.length - INITIAL_PROJECTS;

  const toggle = () => {
    const next = !showAll;
    setShowAll(next);
    if (next) {
      // Move keyboard and screen-reader users to the first newly shown project.
      requestAnimationFrame(() => document.getElementById(`project-${projects[INITIAL_PROJECTS].slug}`)?.focus());
    } else {
      requestAnimationFrame(() => toggleRef.current?.scrollIntoView({ block: "center" }));
    }
  };

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="wrap">
        <SectionHeading id="projects-heading" index="01" eyebrow="Selected work" title="Products worth opening first.">
          Real products, from AI-powered conversations to student housing. Each one shows the problem, what I built, and
          where to try it, with a full case study behind it.
        </SectionHeading>

        <div id="project-list" className="grid gap-20 md:gap-28">
          {visible.map((project, index) => (
            <FeaturedProject key={project.slug} project={project} index={index} />
          ))}
        </div>

        <div className="mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4" data-reveal>
          <button
            ref={toggleRef}
            type="button"
            className="btn btn-ghost btn-expand"
            aria-expanded={showAll}
            aria-controls="project-list"
            onClick={toggle}
          >
            {showAll ? "Show fewer projects" : `Show all ${projects.length} projects`}
            {!showAll && <span className="count-badge">+{hiddenCount}</span>}
            <FaChevronDown aria-hidden="true" className={`chev ${showAll ? "is-up" : ""}`} />
          </button>
          <a
            className="text-link inline-flex items-center gap-2"
            href={portfolioProfile.links.github}
            target="_blank"
            rel="noopener noreferrer me"
          >
            <FaGithub aria-hidden="true" /> More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
