/**
 * Pure (no-three) voyage math. Kept separate from voyagePath.ts so the eager
 * ScrollController can import snap/progress helpers without pulling three.js
 * into the initial bundle — three stays in the lazily-loaded Scene chunk.
 */

// Number of dockable islands. Must match ISLAND_POSITIONS in voyagePath.ts.
export const STOP_COUNT = 7;

// Control points = open-sea start + one dock per island.
const SEGMENTS = STOP_COUNT; // (controlPoints - 1), since there are STOP_COUNT+1 points

/** Snap targets along the path: hero (t=0) + each dock. */
export const SNAP_TS: number[] = Array.from(
  { length: SEGMENTS + 1 },
  (_, i) => i / SEGMENTS
);

/** Active stop index from progress: -1 = hero/open sea, else 0..STOP_COUNT-1. */
export function activeStopFromT(t: number): number {
  return Math.round(t * SEGMENTS) - 1;
}

/** Scroll progress t for a given stop index. */
export function stopProgress(index: number): number {
  return (index + 1) / SEGMENTS;
}
