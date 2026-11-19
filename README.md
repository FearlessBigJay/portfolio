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

## BigJay AI (portfolio assistant)

The chat calls `/.netlify/functions/portfolio-ai` (OpenAI Responses API, structured output: answer, suggested
actions, follow-up questions). Set in Netlify environment variables:

- `OPENAI_API_KEY` (required)
- `OPENAI_MODEL` (optional, defaults to `gpt-4.1-mini`)

What it knows comes from `src/data/assistantKnowledge.js`, which pulls in the profile, resume details, every case
study, testimonials and the FAQ. **To teach it something new, add a line to `extraFacts` in that file.** Without the
API key (or if the call fails) the chat falls back to keyword search over the same knowledge.
The function only accepts user/assistant messages, caps message length, rate-limits per IP, and only allows CORS
from the site itself.

## SEO and AI search

- Pre-rendered HTML per page with title, description, canonical, Open Graph and JSON-LD (Person with aliases
  BigJay/FearlessBigJay, WebSite, ProfilePage, FAQPage, CreativeWork, BreadcrumbList)
- `sitemap.xml`, `llms.txt` and `llms-full.txt` are generated on every build
- `robots.txt` allows search engines and AI crawlers; Google verification file and IndexNow key are in `public/`
- After each deploy, run `npm run indexnow` to notify Bing/Copilot/ChatGPT Search, Yandex and others

## Themes

Six themes (BigJay Dark, BigJay Light, Forest, Ocean, Dusk, Sepia) plus "Match my device". Brand yellow is the
accent in all of them. To add one: add it to `src/data/themes.js`, add a `[data-palette="<id>"]` block in
`src/index.css` (check text contrast), and add its id to the scheme map in `index.html`'s pre-paint script.

## Motion and accessibility

Animations use Framer Motion and CSS. Pointer effects (hero parallax, project tilt, magnetic buttons, card spotlight,
signal guide) only run on fine pointers. Everything is disabled when the visitor prefers reduced motion or turns on
"Reduce motion" in the settings panel (gear icon in the header).
