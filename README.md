# BigJay — Portfolio of Jah'swill Uchechi Emmanuel (@FearlessBigJay)

Vite + React 19 + Tailwind CSS 4, deployed on Netlify.

Live: https://fearlessbigjay.netlify.app/

## Pages and pre-rendering

Every page is pre-rendered to static HTML at build time, so search engines and link previews get full content
and page-specific tags, then React hydrates it in the browser.

- `/` home, `/work/<slug>/` one case study per project (from `src/data/projects.js`), `404.html`
- `src/routes.js` maps URLs to pages; `src/seo.js` builds each page's title, description, canonical URL,
  Open Graph/Twitter tags and JSON-LD (Person, WebSite, ProfilePage, CreativeWork, BreadcrumbList)
- `scripts/prerender.js` runs after the client and SSR builds, writes the HTML files and `sitemap.xml`
- Share images live in `public/og/<slug>.jpg` (1200×630). Add one when you add a project.
- The site URL is `portfolioProfile.site` in `src/data/portfolioProfile.js`; change it there if the domain changes
  (and in `public/robots.txt`).

To add a project: add an entry to `projects` in `src/data/projects.js`, add `public/og/<slug>.jpg`, run `npm run build`.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — client build, SSR build, then pre-render all pages to `dist/`
- `npm run lint` — ESLint

## Where things live

- `src/data/projects.js` — all project content and links, in display order (the first three show before "Show all")
- `src/data/portfolioProfile.js` — brand (BigJay / FearlessBigJay), profile, experience, education, certificates, contact links.
  The visible site **and** the portfolio assistant both read from these two files, so update facts there.
- `src/index.css` — design tokens (dark/light/high contrast, brand yellow `#ffc629`), layout primitives and component styles
- `src/components/SettingsPanel.jsx` — display & accessibility settings (theme, text size, high contrast, readable font, underline links, reduce motion)
- `src/hooks/useSiteMotion.js` — section list, active-section tracking, scroll reveal
- `netlify/functions/portfolio-ai.js` — serverless endpoint for the assistant

## Portfolio assistant

The floating assistant calls `/.netlify/functions/portfolio-ai`. To enable live answers on Netlify set:

- `OPENAI_API_KEY`
- `OPENAI_MODEL` (optional, defaults to `gpt-4.1-mini`)

Without the key, the assistant answers from the local site data.

## Motion and accessibility

Animations use Framer Motion and CSS. Pointer effects (hero parallax, project tilt, magnetic buttons, card spotlight,
signal guide) only run on fine pointers. Everything is disabled when the visitor prefers reduced motion or turns on
"Reduce motion" in the settings panel (gear icon in the header).
