import { Fragment } from "react";
import { FaArrowRight, FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import { portfolioProfile } from "../data/portfolioProfile";
import HeroNetwork from "./HeroNetwork";
import Magnetic from "./Magnetic";

// Entrance animations are pure CSS (see .rise / .word-in in index.css) so the
// pre-rendered HTML is fully readable before, or without, JavaScript.

/** Splits a phrase into words that rise in one after another. */
const Words = ({ text, start = 0, className = "" }) =>
  text.split(" ").map((word, i) => (
    <Fragment key={`${word}-${i}`}>
      <span className="word-mask">
        <span className="word-in" style={{ "--d": `${(start + i * 0.06).toFixed(2)}s` }}>
          {className ? <span className={className}>{word}</span> : word}
        </span>
      </span>{" "}
    </Fragment>
  ));

const Hero = () => {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-10 items-center">
        <div>
          <p className="brand-pill rise" style={{ "--d": "0s" }}>
            <span className="brand-pill-dot" aria-hidden="true" />
            <strong>{portfolioProfile.brand}</strong>
            <span className="faint">@{portfolioProfile.handle}</span>
          </p>

          <p className="text-lg md:text-xl font-medium m-0 mb-5 rise" style={{ "--d": "0.08s" }}>
            Hi, I&apos;m <span style={{ color: "var(--signal)" }}>{portfolioProfile.name}</span>
            <span className="muted">
              , known as <strong style={{ color: "var(--text)" }}>{portfolioProfile.brand}</strong>, based in{" "}
              {portfolioProfile.location}.
            </span>
          </p>

          <h1 id="hero-title" className="hero-title">
            <span className="role">
              <Words text="Full-Stack Software Engineer" start={0.15} />
            </span>{" "}
            <span className="rest">
              <Words text="building practical web products and" start={0.4} />
              <em>
                <Words text="AI-enabled experiences." start={0.75} className="shimmer-text" />
              </em>
            </span>
          </h1>

          <p className="lede mt-6 rise" style={{ "--d": "0.9s" }}>
            I work across React interfaces and Node.js APIs, from the first sketch to a deployed product. Start with the
            selected work, or get in touch if you have something to build.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 rise" style={{ "--d": "1s" }}>
            <Magnetic>
              <a className="btn btn-primary btn-shine" href="#projects">
                View selected work <FaArrowRight aria-hidden="true" className="nudge" />
              </a>
            </Magnetic>
            <a className="btn btn-ghost" href="#contact">
              Contact me
            </a>
            <a className="btn btn-ghost" href={portfolioProfile.resume} target="_blank" rel="noopener">
              <FaFileAlt aria-hidden="true" /> Resume
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </div>

          <ul
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 list-none p-0 text-sm rise"
            style={{ "--d": "1.1s" }}
          >
            <li>
              <a
                className="text-link inline-flex items-center gap-2"
                href={portfolioProfile.links.github}
                target="_blank"
                rel="noopener noreferrer me"
              >
                <FaGithub aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a
                className="text-link inline-flex items-center gap-2"
                href={portfolioProfile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer me"
              >
                <FaLinkedin aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a className="text-link" href={`mailto:${portfolioProfile.email}`}>
                {portfolioProfile.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="hero-visual">
          <HeroNetwork />
        </div>
      </div>
    </section>
  );
};

export default Hero;
