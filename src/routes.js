import { findProject, projectPath, projects } from "./data/projects.js";

/** Maps a URL path to a page. Shared by the browser, the pre-renderer, and the SEO head. */
export function resolveRoute(pathname = "/") {
  const path = pathname.split(/[?#]/)[0];
  if (path === "/" || path === "/index.html") return { type: "home", path: "/" };

  const match = path.match(/^\/work\/([a-z0-9-]+)\/?$/);
  const project = match && findProject(match[1]);
  if (project) return { type: "project", path: projectPath(project), project };

  return { type: "notfound", path };
}

/** Every page that gets its own pre-rendered HTML file and a sitemap entry. */
export const routePaths = ["/", ...projects.map(projectPath)];
