// Pre-renders every route to static HTML after `vite build`.
//
//   vite build                      -> dist/ (client bundle + index.html template)
//   vite build --ssr ...            -> dist-ssr/entry-server.js
//   node scripts/prerender.js       -> dist/index.html, dist/work/<slug>/index.html,
//                                      dist/404.html, dist/sitemap.xml
//
// Search engines and link previews get complete HTML with page-specific titles,
// descriptions, canonical URLs and structured data; React then hydrates it.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, routePaths } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const { portfolioProfile } = await import(pathToFileURL(path.join(root, "src/data/portfolioProfile.js")).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
for (const marker of ["<!--app-head-->", "<!--app-html-->"]) {
  if (!template.includes(marker)) throw new Error(`index.html is missing the ${marker} marker`);
}

const page = (url) => {
  const { html, head } = render(url);
  return template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);
};

const write = (relative, contents) => {
  const file = path.join(dist, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
  console.log(`  prerendered ${relative}`);
};

for (const url of routePaths) {
  write(url === "/" ? "index.html" : path.join(url, "index.html"), page(url));
}
// Netlify serves dist/404.html (with a 404 status) for any unknown URL.
write("404.html", page("/404"));

const site = portfolioProfile.site.replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routePaths
  .map(
    (url) => `  <url>
    <loc>${site}${url}</loc>
    <lastmod>${today}</lastmod>
    <priority>${url === "/" ? "1.0" : "0.8"}</priority>${
      url === "/"
        ? `
    <image:image><image:loc>${site}/HeroImg.png</image:loc></image:image>`
        : `
    <image:image><image:loc>${site}/og${url.replace(/^\/work/, "").replace(/\/$/, "")}.jpg</image:loc></image:image>`
    }
  </url>`,
  )
  .join("\n")}
</urlset>
`;
write("sitemap.xml", sitemap);

fs.rmSync(ssrDir, { recursive: true, force: true });
