import { useSyncExternalStore } from "react";

/**
 * Voyage state shared between the scroll controller, the R3F scene, and the
 * React chrome.
 *
 * - `voyage.t` is the per-frame scroll progress along the path. It's a plain
 *   mutable field read inside useFrame — deliberately NOT reactive, to avoid
 *   re-rendering React on every scroll tick.
 * - `activeIndex` (docked island, -1 = open sea) and `openIndex` (which island
 *   panel is open, null = none) ARE reactive via useSyncExternalStore.
 */
export const voyage = { t: 0 };

let activeIndex = -1;
let openIndex: number | null = null;
let voyageActive = false; // is the interactive 3D voyage mounted (vs. the Logbook fallback)?

const listeners = new Set<() => void>();
function emit() {
  for (const l of listeners) l();
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function setActiveIndex(i: number) {
  if (i !== activeIndex) {
    activeIndex = i;
    emit();
  }
}
export function openStop(i: number) {
  if (i !== openIndex) {
    openIndex = i;
    emit();
  }
}
export function closeStop() {
  if (openIndex !== null) {
    openIndex = null;
    emit();
  }
}
export function setVoyageActive(v: boolean) {
  if (v !== voyageActive) {
    voyageActive = v;
    emit();
  }
}

export function useActiveIndex() {
  return useSyncExternalStore(
    subscribe,
    () => activeIndex,
    () => -1
  );
}
export function useOpenIndex() {
  return useSyncExternalStore(
    subscribe,
    () => openIndex,
    () => null
  );
}
export function useVoyageActive() {
  return useSyncExternalStore(
    subscribe,
    () => voyageActive,
    () => false
  );
}

// Non-hook reads for useFrame / imperative code.
export const getOpenIndex = () => openIndex;
export const getActiveIndex = () => activeIndex;
