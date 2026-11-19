import { FaFileAlt } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { certifications, education, experience, portfolioProfile } from "../data/portfolioProfile";

const Resume = () => {
  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-8">
          <SectionHeading id="experience-heading" index="04" eyebrow="Experience" title="Where the work has happened.">
            Roles, study, and training. The PDF resume has the same record in a format that is easy to forward.
          </SectionHeading>
          <a
            className="btn btn-primary mb-10 md:mb-14 self-start md:self-auto shrink-0"
            href={portfolioProfile.resume}
            target="_blank"
            rel="noopener"
          >
            <FaFileAlt aria-hidden="true" /> View resume (PDF)
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-12">
          <ol className="timeline">
            {experience.map((role) => (
              <li key={role.title} data-reveal>
                <p className="mono text-xs faint m-0 mb-1">{role.period}</p>
                <h3 className="text-xl md:text-2xl font-bold m-0">{role.title}</h3>
                <p className="m-0 mt-1 font-medium">
                  {role.company}
                  <span className="faint"> · {role.location}</span>
                </p>
                <p className="muted m-0 mt-3">{role.summary}</p>
                <ul className="bullets">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="grid gap-5 content-start">
            <article className="panel p-6" data-reveal>
              <h3 className="kicker !mb-3">Education</h3>
              <p className="font-semibold m-0">{education.title}</p>
              <p className="muted m-0 mt-1">
                {education.school} · {education.period}
              </p>
            </article>
            <article className="panel p-6" data-reveal>
              <h3 className="kicker !mb-4">Certificates & training</h3>
              <ul className="grid gap-3 list-none p-0 m-0">
                {certifications.map((item) => (
                  <li key={`${item.issuer}-${item.title}`}>
                    <p className="font-medium m-0 leading-snug">{item.title}</p>
                    <p className="text-sm faint m-0">{item.issuer}</p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
