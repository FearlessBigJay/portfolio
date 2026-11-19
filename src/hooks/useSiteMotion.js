import { useEffect, useState, useSyncExternalStore } from "react";

export const sections = [
  { id: "hero", label: "Intro", nav: false },
  { id: "projects", label: "Selected work", nav: "Work" },
  { id: "about", label: "About", nav: "About" },
  { id: "skills", label: "Stack", nav: "Stack" },
  { id: "experience", label: "Experience", nav: "Experience" },
  { id: "testimonials", label: "Notes", nav: false },
  { id: "faq", label: "FAQ", nav: false },
  { id: "contact", label: "Contact", nav: "Contact" },
];

const noopSubscribe = () => () => {};

/**
 * False while the server-rendered HTML is being hydrated, true afterwards.
 * Use it for output that depends on the browser (saved theme, the clock) so the
 * first client render matches the pre-rendered HTML.
 */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** Tracks which section is crossing a line ~35% down the viewport. */
export function useActiveSection() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const nodes = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return active;
}

/** True once the page has scrolled past `offset` pixels. */
export function useScrolledPast(offset) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return past;
}

/**
 * Adds `.is-in` to every [data-reveal] element as it enters the viewport,
 * including elements rendered later (e.g. when "Show all projects" expands).
 */
export function useReveal() {
  useEffect(() => {
    const showAll = () => document.querySelectorAll("[data-reveal]").forEach((node) => node.classList.add("is-in"));
    if (!("IntersectionObserver" in window)) {
      showAll();
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    const watch = (root) => {
      if (root.matches?.("[data-reveal]:not(.is-in)")) observer.observe(root);
      root.querySelectorAll?.("[data-reveal]:not(.is-in)").forEach((node) => observer.observe(node));
    };
    watch(document.body);

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => node.nodeType === 1 && watch(node)));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
}

/** Sets --mx/--my on the card under the pointer so CSS can draw a soft spotlight. Fine pointers only. */
export function useSpotlight() {
  useEffect(() => {
    if (!hasFinePointer()) return undefined;
    let frame = 0;
    const onMove = (event) => {
      const card = event.target.closest?.(".panel");
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);
}

/** Centre of an element in viewport coordinates (origin for the theme reveal). */
export const centerOf = (element) => {
  if (!element) return undefined;
  const rect = element.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
};

/** Fine pointer (mouse/trackpad) that can hover: the only case where we add pointer effects. */
export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
