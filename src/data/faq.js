// Questions people (and search engines / AI answer engines) ask about BigJay.
// Shown on the home page, emitted as FAQPage structured data, and given to the
// portfolio assistant. Keep answers factual: only what is on this site or the resume.
import { brand, portfolioProfile } from "./portfolioProfile.js";

export const faqs = [
  {
    q: "Who is BigJay?",
    a: `BigJay (also known as ${brand.handle}) is ${portfolioProfile.name}, a full-stack software engineer based in Owerri, Imo State, Nigeria. He builds web products with React, TypeScript, and Node.js, including AI-enabled applications, and has worked as a Full Stack Engineer at Tymlova (formerly Migo Express Nigeria) since March 2025.`,
  },
  {
    q: "What has FearlessBigJay built?",
    a: "His selected work includes FormChat (an AI-powered conversational form platform), UniDwell (a student accommodation platform), and FloodSense (a flood-awareness platform that placed fifth in the 3MTT Imo State pitch competition). He has also built XZMovies, Clipit, Code Quest, and a Users REST API. Each project has a full case study on this site.",
  },
  {
    q: "What technologies does BigJay work with?",
    a: "Mainly React, TypeScript, JavaScript, Tailwind CSS, and Redux Toolkit on the frontend; Node.js, Express, PostgreSQL, MongoDB, and Supabase on the backend; and AI integrations such as Supabase Edge Functions calling AI models. He deploys with Git, Vite, Netlify, Vercel, and Render.",
  },
  {
    q: "Is BigJay available for work?",
    a: `Yes. He is ${portfolioProfile.availability.toLowerCase()}. The quickest ways to reach him are email (${portfolioProfile.email}) and WhatsApp (${portfolioProfile.phone}).`,
  },
  {
    q: "Where did BigJay study software engineering?",
    a: "He completed a Diploma in Computer Science (Software Engineering) at AltSchool Africa in May 2025, alongside web development internships at CodeAlpha and CodSoft.",
  },
  {
    q: "How can I contact FearlessBigJay?",
    a: `Email ${portfolioProfile.email}, WhatsApp ${portfolioProfile.phone}, LinkedIn (linkedin.com/in/fearlessbigjay), or GitHub (github.com/FearlessBigJay). There is also a contact form at the bottom of this page.`,
  },
];
