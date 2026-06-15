import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server — avoids the SSR
 * warning while still letting GSAP set initial states before first paint
 * (no flash of un-animated content). This is the pattern GSAP recommends.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
