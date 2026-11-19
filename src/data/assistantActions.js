// Actions the assistant can suggest. The model only proposes them; the visitor
// clicks a button to run one. Shared by the Netlify function (allowed values)
// and the chat UI (labels and handlers).
import { projects } from "./projects.js";
import { THEMES } from "./themes.js";

export const SECTION_IDS = ["projects", "about", "skills", "experience", "testimonials", "faq", "contact"];

export const ACTION_TYPES = {
  open_case_study: { values: projects.map((p) => p.slug) },
  go_to_section: { values: SECTION_IDS },
  set_theme: { values: THEMES.map((t) => t.id) },
  open_resume: {},
  email: {},
  whatsapp: {},
  open_github: {},
  open_linkedin: {},
  open_settings: {},
};

/** Keeps only known actions with allowed values, de-duplicated, max 3. */
export const sanitizeActions = (actions) => {
  if (!Array.isArray(actions)) return [];
  const seen = new Set();
  return actions
    .filter((a) => a && ACTION_TYPES[a.type])
    .map((a) => ({ type: a.type, value: typeof a.value === "string" ? a.value : "" }))
    .filter((a) => !ACTION_TYPES[a.type].values || ACTION_TYPES[a.type].values.includes(a.value))
    .filter((a) => {
      const key = `${a.type}:${a.value}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 3);
};
