import type Lenis from "lenis";

/**
 * Holds the live Lenis instance so non-scroll-controller components (e.g. the
 * chapter-dot navigation) can drive smooth programmatic scrolling without
 * prop-drilling or context. ScrollController sets it on init and clears it on
 * teardown. Falls back to native scrolling when Lenis isn't active (reduced
 * motion / before hydration).
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset: -64 }); // clear the fixed nav
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
