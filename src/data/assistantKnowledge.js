// Everything the BigJay AI assistant knows, built from the same data the site
// shows (plus the resume). Used by the Netlify function (system prompt) and by
// the in-browser fallback (keyword retrieval) when the live AI is unavailable.
//
// To teach the assistant something new about you, add it to `extraFacts`
// below (or to the data files it already reads). Never add private details
// such as a street address.
import { brand, certifications, education, experience, portfolioProfile } from "./portfolioProfile.js";
import { projectPath, projects } from "./projects.js";
import { faqs } from "./faq.js";
import { testimonials } from "./testimonials.js";
import { THEMES } from "./themes.js";

const SITE = portfolioProfile.site.replace(/\/$/, "");

/** Extra resume details not shown elsewhere on the site. */
const resumeDetails = {
  profile:
    "Full Stack Engineer with experience building performant and scalable web applications using React, Node.js, Express, and PostgreSQL. Proficient in front-end and back-end development, API integration, and responsive UI. Passionate about clean, maintainable code and solving real-world problems through technology.",
  internships: [
    "Web Development Intern, CodeAlpha (January 2025 to April 2025)",
    "Web Development Intern, CodSoft (January 2025 to February 2025)",
  ],
  internshipPoints: [
    "Completed project-based internships focused on building responsive user interfaces.",
    "Developed mini web applications with HTML, CSS, JavaScript, and React.",
    "Improved component structure and UI consistency across projects.",
    "Strengthened skills in Git, responsive design, and basic state management.",
  ],
  tymlovaExtra: "Joined through intensive internal training, then moved into a full-time full-stack engineering role.",
  cafeExtra:
    "Used Microsoft Office (Word, Excel, PowerPoint) for customer documents, and operated printers, scanners, laminators, and photocopiers in a busy cyber café.",
  secondary: "Senior Secondary Certificate Examination (WAEC and NECO), Fremar College, 2022.",
  resumeSkills: {
    "Front-end":
      "HTML5, CSS3, JavaScript (ES6+), TypeScript, React (Redux, Context API), Next.js, Vue.js (Vuex, Pinia, Nuxt.js), jQuery; Tailwind CSS, Bootstrap, Material UI, Chakra UI, Styled-Components, Sass/SCSS, Figma-to-code",
    "Back-end":
      "Node.js (JavaScript/TypeScript), Express, NestJS; Python (Flask, Django, FastAPI, Django REST Framework); PHP (Laravel)",
    Databases: "PostgreSQL, MySQL/MariaDB, MongoDB, Firebase Realtime DB/Firestore",
    "Cloud and hosting":
      "AWS (EC2, S3, RDS, Lambda), Google Cloud, Azure, Firebase Hosting/Functions, Heroku, Vercel, Netlify, Render, DigitalOcean",
    Testing: "Jest, React Testing Library, Cypress, Supertest",
    "Auth and security":
      "OAuth 2.0/OpenID Connect, JWT, Passport.js, Auth0, Firebase Auth, rate limiting, CORS, Helmet",
    APIs: "REST, GraphQL, WebSockets, JSON/XML, Swagger/OpenAPI",
    Tooling:
      "Git, GitHub/GitLab/Bitbucket, Git Flow, npm/yarn/pnpm, Webpack, Vite, Parcel, Babel, Gulp, ESLint, Prettier, VS Code, Chrome DevTools, Postman",
    Other:
      "Redux Toolkit, Zustand/Jotai/Recoil, TypeORM/Sequelize/Mongoose, Zod/Yup, WordPress, PWAs (service workers, IndexedDB, Workbox)",
    "Soft skills":
      "Agile/Scrum, team collaboration (Slack, Discord), problem-solving and debugging, time management, communication",
  },
};

/** Add anything else you want the assistant to know here (one fact per string). */
export const extraFacts = [
  "BigJay is a personal brand name; FearlessBigJay is the handle used on GitHub, LinkedIn, and this site's address.",
  "He works remotely and is based in Owerri, Imo State, Nigeria (time zone: West Africa Time, UTC+1).",
];

const caseStudyText = (p) =>
  [
    `### ${p.title} (${p.category})`,
    `Tagline: ${p.tagline}`,
    `Case study page: ${SITE}${projectPath(p)}`,
    `Live demo: ${p.link || "no public demo"}`,
    `Source: ${
      p.repos ? p.repos.map((r) => `${r.label} ${r.url}`).join("; ") : p.repo || "private repository (not public)"
    }`,
    p.award ? `Award: ${p.award}` : "",
    `Overview: ${p.overview.join(" ")}`,
    `Problem: ${p.problem.intro} ${p.problem.points.join(" ")}`,
    `Solution: ${p.solution.join(" ")}`,
    `Features${p.featuresNote ? ` (${p.featuresNote})` : ""}: ${p.features.join("; ")}.`,
    `Stack: ${(p.stack || p.tech).join(", ")}${p.backendStack ? `. Companion API: ${p.backendStack.join(", ")}` : ""}.`,
    `Engineering approach: ${p.approach.join(" ")} Key considerations: ${p.considerations.join(" ")}`,
    `Outcome: ${p.outcome.join(" ")}`,
    p.note ? `Important note: ${p.note}` : "",
    `Highlights: ${p.highlights.join(", ")}.`,
  ]
    .filter(Boolean)
    .join("\n");

const sections = {
  identity: `## Identity
Name: ${portfolioProfile.name}. Brand: ${brand.name}. Handle: ${brand.handle} (also written fearlessbigjay).
Role: ${portfolioProfile.role}. Location: ${portfolioProfile.city}, Nigeria. ${portfolioProfile.availability}.
Summary: ${portfolioProfile.summary}
Resume profile: ${resumeDetails.profile}
Work style: ${portfolioProfile.workStyle}
${extraFacts.map((f) => `- ${f}`).join("\n")}`,

  contact: `## Contact and links
Email: ${portfolioProfile.email}
Phone / WhatsApp: ${portfolioProfile.phone} (${portfolioProfile.links.whatsapp})
LinkedIn: ${portfolioProfile.links.linkedin}
GitHub: ${portfolioProfile.links.github}
Website: ${SITE}/
Resume (PDF): ${SITE}${portfolioProfile.resume}
Contact form: ${SITE}/#contact`,

  experience: `## Experience
${experience
  .map(
    (r) =>
      `- ${r.title}, ${r.company}, ${r.location}, ${r.period}. ${r.summary} ${r.points.join("; ")}.${
        r.company.startsWith("Tymlova") ? ` ${resumeDetails.tymlovaExtra}` : ""
      }${r.company.startsWith("Total") ? ` ${resumeDetails.cafeExtra}` : ""}`,
  )
  .join("\n")}
Internships in detail: ${resumeDetails.internships.join("; ")}. ${resumeDetails.internshipPoints.join(" ")}`,

  education: `## Education and certificates
- ${education.title}, ${education.school}, ${education.period}.
- ${resumeDetails.secondary}
Certificates: ${certifications.map((c) => `${c.title} (${c.issuer})`).join("; ")}.`,

  skills: `## Skills
Core stack used in his projects: ${portfolioProfile.skills}
Broader skills listed on his resume (he lists these; the projects on this site show the core stack above):
${Object.entries(resumeDetails.resumeSkills)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}`,

  projects: `## Projects (in order of priority; the first three are featured)
${projects.map(caseStudyText).join("\n\n")}`,

  testimonials: `## Testimonials (quoted as written)
${testimonials.map((t) => `- ${t.name}, ${t.title}: "${t.quote}"`).join("\n")}`,

  faq: `## FAQ
${faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n")}`,

  site: `## This website
Home: ${SITE}/ with sections Work (#projects), About (#about), Stack (#skills), Experience (#experience), Notes (#testimonials), FAQ (#faq), Contact (#contact).
Case studies: ${projects.map((p) => `${p.title} ${projectPath(p)}`).join(", ")}.
Themes: ${THEMES.map((t) => `${t.label} (${t.note})`).join(", ")}, or match the device. Change them in the settings panel (gear icon) or the quick menu.
Quick menu: press Ctrl+K (or Cmd+K on Mac), or the search icon in the header.
Accessibility settings (gear icon): text size, high contrast, readable font, underlined links, reduce motion.
Built with React, Vite, Tailwind CSS, and Framer Motion, pre-rendered for search engines and hosted on Netlify.`,
};

/** Full knowledge base for the AI system prompt. */
export const knowledgeText = Object.values(sections).join("\n\n");

/**
 * Small, searchable pieces for the offline fallback. Each has words to match
 * and an optional action the UI can offer.
 */
export const knowledgeChunks = [
  { id: "identity", keys: "who bigjay fearlessbigjay jahswill about name brand", text: portfolioProfile.summary },
  {
    id: "contact",
    keys: "contact email phone whatsapp reach hire linkedin github talk message call",
    text: `Email: ${portfolioProfile.email}\nWhatsApp: ${portfolioProfile.phone}\nLinkedIn: ${portfolioProfile.links.linkedin}\nGitHub: ${portfolioProfile.links.github}\n${portfolioProfile.availability}.`,
    actions: [
      { type: "email", value: "" },
      { type: "whatsapp", value: "" },
    ],
  },
  {
    id: "experience",
    keys: "experience job work career tymlova role company intern internship codealpha codsoft employer current",
    text: experience.map((r) => `- ${r.title}, ${r.company} (${r.period})`).join("\n"),
    actions: [
      { type: "go_to_section", value: "experience" },
      { type: "open_resume", value: "" },
    ],
  },
  {
    id: "education",
    keys: "education school study studied degree diploma altschool certificate certification waec neco fremar",
    text: `${education.title}, ${education.school}, ${education.period}.\nCertificates: ${certifications
      .map((c) => c.title)
      .join("; ")}.`,
  },
  {
    id: "skills",
    keys: "skills stack tech technology language framework react node typescript python backend frontend database tools",
    text: portfolioProfile.skills,
    actions: [{ type: "go_to_section", value: "skills" }],
  },
  {
    id: "availability",
    keys: "available availability remote freelance contract hire open relocate",
    text: `${portfolioProfile.availability}. He is based in ${portfolioProfile.city}, Nigeria (WAT, UTC+1).`,
    actions: [{ type: "go_to_section", value: "contact" }],
  },
  {
    id: "resume",
    keys: "resume cv pdf download",
    text: `His resume is here: ${SITE}${portfolioProfile.resume}`,
    actions: [{ type: "open_resume", value: "" }],
  },
  {
    id: "themes",
    keys: "theme dark light forest ocean dusk sepia colour color mode",
    text: `Themes: ${THEMES.map((t) => t.label).join(", ")}. Use the gear icon or press Ctrl+K.`,
    actions: [{ type: "open_settings", value: "" }],
  },
  ...projects.map((p) => ({
    id: `project-${p.slug}`,
    keys: `${p.title.toLowerCase()} ${p.slug} ${p.category.toLowerCase()} ${(p.stack || p.tech).join(" ").toLowerCase()}`,
    title: p.title,
    text: `${p.title}: ${p.tagline}\n${p.card.built}${p.award ? `\n${p.award}` : ""}\nStack: ${(p.stack || p.tech).join(
      ", ",
    )}`,
    actions: [{ type: "open_case_study", value: p.slug }],
  })),
  ...faqs.map((f, i) => ({ id: `faq-${i}`, keys: f.q.toLowerCase(), text: f.a })),
];
