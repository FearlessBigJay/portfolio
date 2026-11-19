// Builds the <head> tags (title, description, canonical, Open Graph, Twitter,
// JSON-LD) for each pre-rendered page. Runs at build time only.
import { brand, education, experience, portfolioProfile } from "./data/portfolioProfile.js";
import { projectPath, projects } from "./data/projects.js";
import { resolveRoute } from "./routes.js";
import { faqs } from "./data/faq.js";

const SITE = portfolioProfile.site.replace(/\/$/, "");
const abs = (path) => (/^https?:/.test(path) ? path : `${SITE}${path}`);

const PERSON_ID = `${SITE}/#person`;
const WEBSITE_ID = `${SITE}/#website`;

const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// JSON inside <script> must not be able to close the tag.
const jsonForScript = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

const sameAs = [portfolioProfile.links.github, portfolioProfile.links.linkedin];

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: portfolioProfile.name,
  alternateName: [brand.name, brand.handle],
  givenName: "Jah'swill",
  familyName: "Emmanuel",
  jobTitle: portfolioProfile.role,
  description: `${brand.name} (${brand.handle}) is ${portfolioProfile.name}, a full-stack software engineer building practical web products and AI-enabled experiences.`,
  url: `${SITE}/`,
  image: `${SITE}/HeroImg.png`,
  worksFor: { "@type": "Organization", name: experience[0].company.split(" (")[0] },
  alumniOf: { "@type": "EducationalOrganization", name: education.school },
  knowsAbout: [
    "Full-stack web development",
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "Supabase",
    "PostgreSQL",
    "MongoDB",
    "AI integration",
    "REST API design",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Owerri",
    addressRegion: "Imo State",
    addressCountry: "NG",
  },
  homeLocation: { "@type": "Place", name: "Owerri, Imo State, Nigeria" },
  nationality: { "@type": "Country", name: "Nigeria" },
  knowsLanguage: "en",
  email: `mailto:${portfolioProfile.email}`,
  hasOccupation: {
    "@type": "Occupation",
    name: "Full-Stack Software Engineer",
    occupationLocation: { "@type": "Country", name: "Nigeria" },
    skills:
      "React, TypeScript, JavaScript, Node.js, Express, PostgreSQL, MongoDB, Supabase, Tailwind CSS, AI integration",
  },
  mainEntityOfPage: `${SITE}/`,
  sameAs,
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE}/`,
  name: brand.name,
  alternateName: [brand.handle, `${brand.name} Portfolio`, portfolioProfile.name],
  description:
    "Portfolio and project case studies of BigJay (Jah'swill Uchechi Emmanuel), full-stack software engineer.",
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

function homeSeo() {
  const title = `${brand.name} (${portfolioProfile.name}) | Full-Stack Software Engineer`;
  const description = `${brand.name} (${brand.handle}) is ${portfolioProfile.name}, a full-stack software engineer in Nigeria building AI-enabled web products. See FormChat, UniDwell, FloodSense and more.`;
  return {
    title,
    description,
    path: "/",
    image: "/og-image.jpg",
    imageAlt: `${brand.name}, ${portfolioProfile.name}, Full-Stack Software Engineer`,
    ogType: "profile",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        person,
        website,
        {
          "@type": "ProfilePage",
          "@id": `${SITE}/#profile`,
          url: `${SITE}/`,
          name: title,
          description,
          inLanguage: "en",
          isPartOf: { "@id": WEBSITE_ID },
          mainEntity: { "@id": PERSON_ID },
          about: { "@id": PERSON_ID },
          hasPart: projects.map((p) => ({ "@id": `${SITE}${projectPath(p)}#work` })),
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE}/#faq`,
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        {
          "@type": "ItemList",
          name: `Projects by ${brand.name}`,
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE}${projectPath(p)}`,
            name: p.title,
          })),
        },
      ],
    },
  };
}

function projectSeo(project) {
  const path = projectPath(project);
  const url = `${SITE}${path}`;
  const title = `${project.seoTitle} | ${brand.name}`;
  const stack = project.stack || project.tech;
  return {
    title,
    description: project.seoDescription,
    path,
    image: `/og/${project.slug}.jpg`,
    imageAlt: `${project.title} case study by ${brand.name}`,
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": url,
          url,
          name: title,
          description: project.seoDescription,
          inLanguage: "en",
          isPartOf: { "@id": WEBSITE_ID },
          about: { "@id": `${url}#work` },
          author: { "@id": PERSON_ID },
          breadcrumb: { "@id": `${url}#breadcrumb` },
          primaryImageOfPage: abs(`/og/${project.slug}.jpg`),
        },
        {
          "@type": "CreativeWork",
          "@id": `${url}#work`,
          name: project.title,
          headline: `${project.title}: ${project.tagline}`,
          description: project.seoDescription,
          genre: project.category,
          keywords: [...stack, ...project.highlights].join(", "),
          image: abs(`/og/${project.slug}.jpg`),
          url,
          ...(project.link ? { sameAs: [project.link] } : {}),
          ...(project.award ? { award: project.award } : {}),
          author: { "@id": PERSON_ID },
          creator: { "@id": PERSON_ID },
        },
        { ...person, sameAs },
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: brand.name, item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Work", item: `${SITE}/#projects` },
            { "@type": "ListItem", position: 3, name: project.title, item: url },
          ],
        },
      ],
    },
  };
}

function notFoundSeo() {
  return {
    title: `Page not found | ${brand.name}`,
    description:
      "This page doesn't exist. Head back to BigJay's portfolio home page or browse the project case studies.",
    path: "/404",
    image: "/og-image.jpg",
    imageAlt: brand.name,
    ogType: "website",
    noindex: true,
  };
}

export function getSeo(pathname) {
  const route = resolveRoute(pathname);
  if (route.type === "home") return homeSeo();
  if (route.type === "project") return projectSeo(route.project);
  return notFoundSeo();
}

/** The per-page tags injected at <!--app-head--> in index.html. */
export function renderHead(pathname) {
  const seo = getSeo(pathname);
  const url = `${SITE}${seo.path}`;
  const image = abs(seo.image);
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    seo.noindex
      ? `<meta name="robots" content="noindex, follow" />`
      : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    seo.noindex ? "" : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${escapeHtml(brand.name)}" />`,
    `<meta property="og:type" content="${seo.ogType}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(seo.imageAlt)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    seo.ogType === "profile"
      ? `<meta property="profile:first_name" content="Jah'swill" /><meta property="profile:last_name" content="Emmanuel" /><meta property="profile:username" content="${brand.handle}" />`
      : "",
    seo.ogType === "article" ? `<meta property="article:author" content="${SITE}/" />` : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(seo.imageAlt)}" />`,
    seo.jsonLd ? `<script type="application/ld+json">${jsonForScript(seo.jsonLd)}</script>` : "",
  ];
  return tags.filter(Boolean).join("\n    ");
}
