import SectionHeading from "./SectionHeading";
import { education, experience, portfolioProfile } from "../data/portfolioProfile";

const facts = [
  { label: "Known as", value: `${portfolioProfile.brand} · @${portfolioProfile.handle}` },
  { label: "Based in", value: portfolioProfile.location },
  { label: "Now", value: `${experience[0].title} at ${experience[0].company.split(" (")[0]}` },
  { label: "Studied", value: `Software Engineering, ${education.school} (2025)` },
  { label: "Focus", value: "React, Node.js, and AI-enabled web products" },
  { label: "Open to", value: "Remote and contract work" },
];

const About = () => {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="wrap grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start">
        <figure className="m-0 max-w-sm mx-auto lg:mx-0 w-full" data-reveal>
          <img
            src="/AboutImg.jpg"
            width="460"
            height="542"
            loading="lazy"
            decoding="async"
            alt="Jah'swill in a cap and denim jacket against violet stage lights"
            className="w-full rounded-[1.5rem] object-cover border"
            style={{ borderColor: "var(--line-strong)", aspectRatio: "460 / 542" }}
          />
          <figcaption className="status mt-3">
            <span aria-hidden="true">↳</span> {portfolioProfile.city}
          </figcaption>
        </figure>

        <div>
          <SectionHeading
            id="about-heading"
            index="02"
            eyebrow="About BigJay"
            title="Curious builder, practical engineer."
            className="!mb-8"
          />

          <div className="grid gap-5 text-[1.075rem] muted max-w-2xl" data-reveal>
            <p className="m-0">
              I&apos;m Jah&apos;swill, though most people online know me as{" "}
              <strong style={{ color: "var(--text)" }}>BigJay</strong>. I like the stretch between an idea and something
              a person can actually click. Most of my work sits in React on the front and Node.js behind it, with AI
              used where it makes the product more useful, not as decoration.
            </p>
            <p className="m-0">
              Before engineering, I spent close to two years designing flyers, banners, and ID cards and helping
              customers at a busy cyber café. I still care about the same things: clear screens, sensible defaults, and
              products people can use without a manual. I completed AltSchool Africa&apos;s software engineering diploma
              in 2025 and now work as a full-stack engineer.
            </p>
            <p className="m-0" style={{ color: "var(--text)" }}>
              I&apos;m happiest on ambitious, practical problems, and I&apos;m always up for a conversation about one.
            </p>
          </div>

          <dl className="fact-list mt-10" data-reveal>
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
