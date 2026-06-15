import * as THREE from "three";

/**
 * Geometry of the voyage. Islands sit on the sea (y=0) winding into the
 * distance (-z); the ship sails a Catmull-Rom curve whose control points are
 * the open-sea start plus one dock beside each island. Using `getPoint(t)`
 * (not arc-length `getPointAt`) means control point i sits exactly at
 * t = i / (n-1), so scroll snapping to those t values docks the ship precisely.
 */

export const ISLAND_POSITIONS: THREE.Vector3[] = [
  new THREE.Vector3(-7, 0, 0), // harbor
  new THREE.Vector3(8, 0, -16), // origin
  new THREE.Vector3(-9, 0, -33), // arsenal
  new THREE.Vector3(7, 0, -50), // ventures
  new THREE.Vector3(-8, 0, -67), // creed
  new THREE.Vector3(6, 0, -84), // horizon
  new THREE.Vector3(0, 0, -101), // contact / landfall
];

// Open-sea start (the hero) + a dock beside each island.
const CONTROL_POINTS: THREE.Vector3[] = [
  new THREE.Vector3(0, 0, 16),
  new THREE.Vector3(-3.5, 0, 2),
  new THREE.Vector3(4.5, 0, -15),
  new THREE.Vector3(-5, 0, -32),
  new THREE.Vector3(3.5, 0, -49),
  new THREE.Vector3(-4.5, 0, -66),
  new THREE.Vector3(3, 0, -83),
  new THREE.Vector3(0, 0, -98),
];

export const PATH = new THREE.CatmullRomCurve3(
  CONTROL_POINTS,
  false,
  "catmullrom",
  0.5
);

// Snap/progress math lives in voyageMath.ts (no-three) so the eager scroll
// controller doesn't pull three into the initial bundle.

const _pos = new THREE.Vector3();
const _tan = new THREE.Vector3();

export function shipAt(t: number) {
  const clamped = THREE.MathUtils.clamp(t, 0, 1);
  PATH.getPoint(clamped, _pos);
  PATH.getTangent(clamped, _tan);
  return { position: _pos, tangent: _tan };
}

/** Chase camera trailing the ship, looking just ahead. */
export function chaseCamera(t: number) {
  const { position, tangent } = shipAt(t);
  const camPos = position
    .clone()
    .addScaledVector(tangent, -8)
    .add(new THREE.Vector3(0, 4.6, 0));
  const look = position
    .clone()
    .addScaledVector(tangent, 2)
    .add(new THREE.Vector3(0, 0.6, 0));
  return { camPos, look };
}

/** Closer "open" framing of a docked island (the hybrid glide-in). */
export function closeupCamera(islandIndex: number) {
  const island = ISLAND_POSITIONS[islandIndex];
  const dock = CONTROL_POINTS[islandIndex + 1];
  const dir = dock.clone().sub(island).setY(0).normalize();
  const camPos = island
    .clone()
    .addScaledVector(dir, 8)
    .add(new THREE.Vector3(0, 3.2, 0));
  const look = island.clone().add(new THREE.Vector3(0, 1.1, 0));
  return { camPos, look };
}
