import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiRedux,
  SiVuedotjs,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiSupabase,
  SiSocketdotio,
  SiJsonwebtokens,
  SiGit,
  SiVite,
  SiNetlify,
  SiVercel,
  SiRender,
} from "react-icons/si";
import { FaPlug } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

// Grouped by where each tool shows up in the projects on this site.
const groups = [
  {
    title: "Interface",
    note: "FormChat, UniDwell, Clipit, XZMovies, Code Quest",
    color: "var(--signal)",
    skills: [
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Redux Toolkit", icon: SiRedux },
      { name: "Vue 3", icon: SiVuedotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    title: "Backend & data",
    note: "UniDwell, FloodSense API, XZMovies API, Users API",
    color: "var(--coral)",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Supabase", icon: SiSupabase },
      { name: "REST APIs", icon: FaPlug },
      { name: "Socket.io", icon: SiSocketdotio },
      { name: "JWT auth", icon: SiJsonwebtokens },
    ],
  },
  {
    title: "Shipping",
    note: "How the projects above get built and deployed",
    color: "var(--violet)",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "Vite", icon: SiVite },
      { name: "Netlify", icon: SiNetlify },
      { name: "Vercel", icon: SiVercel },
      { name: "Render", icon: SiRender },
    ],
  },
];

const alsoFamiliar = ["Next.js", "Docker", "AWS", "Jest"];

const Skills = () => {
  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="wrap">
        <SectionHeading id="skills-heading" index="03" eyebrow="Stack" title="The tools I actually ship with.">
          Grouped by where they show up in my work, so you can trace each one back to a real project.
        </SectionHeading>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((group, i) => (
            <div
              key={group.title}
              className="panel skill-group"
              style={{ "--c": group.color, "--delay": `${i * 80}ms` }}
              data-reveal
            >
              <h3>
                <i aria-hidden="true" />
                {group.title}
              </h3>
              <p className="text-sm faint m-0 mb-5">{group.note}</p>
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                {group.skills.map(({ name, icon: Icon }) => (
                  <li key={name} className="skill-chip">
                    <Icon aria-hidden="true" size={15} />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm muted" data-reveal>
          <span className="mono text-xs faint uppercase tracking-wider mr-2">Also familiar with</span>
          {alsoFamiliar.join(" · ")}
        </p>
      </div>
    </section>
  );
};

export default Skills;
