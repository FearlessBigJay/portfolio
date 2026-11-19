import { portfolioProjects } from "./projects.js";

export { portfolioProjects };

// Facts below were reconciled against the resume PDF (public/bigjayzFullResume.pdf).
// Do not add client counts, project totals, or metrics that are not in the resume.

export const experience = [
  {
    title: "Full-Stack Engineer",
    company: "Tymlova (formerly Migo Express Nigeria)",
    location: "Remote",
    period: "Mar 2025 — Present",
    summary:
      "Joined through intensive internal training, then moved into a full-time role across frontend and backend work on internal and client-facing projects.",
    points: [
      "Build responsive, component-based interfaces with React, JavaScript, and Tailwind CSS",
      "Develop backend features and integrate APIs with Node.js and Express",
      "Keep shipped code to performance, SEO, and quality standards",
      "Manage my own tasks and delivery with Git-based workflows",
    ],
  },
  {
    title: "Web Development Intern",
    company: "CodeAlpha · CodSoft",
    location: "Remote",
    period: "Jan — Apr 2025",
    summary: "Project-based internships focused on responsive user interfaces.",
    points: [
      "Built small web applications with HTML, CSS, JavaScript, and React",
      "Improved component structure and visual consistency across projects",
    ],
  },
  {
    title: "Graphic Designer & Digital Services Assistant",
    company: "Total Success Impressa",
    location: "Imo State, Nigeria",
    period: "Jan 2023 — Sep 2024",
    summary: "Design and document services in a busy cyber café.",
    points: [
      "Designed flyers, banners, business cards, and ID cards in CorelDRAW and Photoshop",
      "Prepared and formatted customer documents and helped people with everyday tech tasks",
    ],
  },
];

export const education = {
  title: "Diploma in Computer Science (Software Engineering)",
  school: "AltSchool Africa",
  period: "Completed May 2025",
};

export const certifications = [
  { title: "Internship Certificate of Completion", issuer: "CodSoft" },
  { title: "Internship, Web Development", issuer: "CodeAlpha" },
  { title: "Career Essentials in Software Development", issuer: "Microsoft & LinkedIn" },
  { title: "The Front-End Developer Career Path", issuer: "Scrimba" },
  { title: "Soft Skills Training, Certificate of Achievement", issuer: "Jobberman" },
  { title: "Certificate of Participation", issuer: "Unstop Talent Park 2025" },
];

// Personal brand. Use the same name and handle everywhere (site, socials, GitHub,
// LinkedIn) so search engines connect them to one person.
export const brand = {
  name: "BigJay",
  handle: "FearlessBigJay",
  tagline: "Fearless about the hard parts of shipping.",
};

export const portfolioProfile = {
  name: "Jah'swill Uchechi Emmanuel",
  shortName: "Jah'swill",
  brand: brand.name,
  handle: brand.handle,
  role: "Full-Stack Software Engineer",
  title: "Full-Stack Software Engineer building practical web products and AI-enabled experiences.",
  location: "Imo State, Nigeria",
  city: "Owerri, Imo State",
  timeZone: "Africa/Lagos",
  focus: "React and Node.js applications, full-stack products, and AI-enabled web experiences.",
  availability: "Open to remote and contract work",
  email: "jahswill4jahs@gmail.com",
  phone: "+234 901 651 0703",
  resume: "/bigjayzFullResume.pdf",
  site: "https://fearlessbigjay.netlify.app",
  links: {
    github: "https://github.com/FearlessBigJay",
    linkedin: "https://linkedin.com/in/fearlessbigjay",
    whatsapp: "https://wa.me/2349016510703",
  },
  summary:
    "Jah'swill Uchechi Emmanuel, known online as BigJay (FearlessBigJay), is a full-stack software engineer based in Imo State, Nigeria. He builds React and Node.js applications, full-stack products, and AI-enabled web experiences. Selected work includes FormChat, UniDwell, and FloodSense, plus XZMovies, Clipit, Code Quest, and a Users API.",
  experience: experience.map((role) => `${role.title} at ${role.company} (${role.period}): ${role.summary}`).join(" "),
  education: `${education.title}, ${education.school}, ${education.period}.`,
  skills:
    "Interface: React, TypeScript, JavaScript, Redux Toolkit, Vue 3, Tailwind CSS, Framer Motion. Backend and data: Node.js, Express, MongoDB, PostgreSQL, Supabase, REST APIs, Socket.io, JWT authentication. Delivery: Git, Vite, Netlify, Vercel, Render. Also familiar with Next.js, Docker, AWS, and Jest.",
  certifications: certifications.map((item) => `${item.title} (${item.issuer})`).join("; "),
  workStyle:
    "He cares about clear interfaces, maintainable full-stack structure, and shipping work that is practical to use.",
};

export const portfolioStarterPrompts = [
  "Who is BigJay?",
  "What has he built?",
  "What stack does he use?",
  "How can I contact him?",
];

export const portfolioAssistantGreeting =
  "Hi! I'm BigJay's portfolio assistant. Ask about Jah'swill's projects, experience, stack, or how to get in touch.";
