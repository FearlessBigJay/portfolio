import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App url={window.location.pathname} />
  </StrictMode>
);

// Production pages are pre-rendered to HTML (scripts/prerender.js), so React attaches
// to the existing markup. The dev server serves an empty root, so render from scratch.
if (import.meta.env.DEV) {
  // In dev there is no pre-rendered <head>, so at least set the page title.
  import("./seo.js").then(({ getSeo }) => {
    document.title = getSeo(window.location.pathname).title;
  });
}

if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
