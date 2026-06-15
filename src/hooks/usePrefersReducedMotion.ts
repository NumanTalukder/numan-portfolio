"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the `prefers-reduced-motion` media query. Used to freeze the camera
 * animation and scene drift for users who ask for reduced motion.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
