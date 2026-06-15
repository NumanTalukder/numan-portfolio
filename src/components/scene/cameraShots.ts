/**
 * Bridge between the scroll-driven GSAP timeline (ScrollController) and the R3F
 * render loop (CameraRig). GSAP writes the animated target into `cameraState`;
 * CameraRig reads it each frame and eases the real camera toward it. A plain
 * module singleton keeps this off React's render path entirely.
 */

export type Shot = {
  /** camera world position */
  pos: [number, number, number];
  /** world-space point the camera looks at */
  look: [number, number, number];
};

/**
 * Six cinematic "shots" — one per scroll beat (hero + five chapters). The path
 * is a slow forward dolly through the starfield that glides past the north star
 * (world ~[6.5, 2.2, -24]) and settles gazing toward the far horizon.
 */
export const SHOTS: Shot[] = [
  { pos: [0, 0, 8], look: [0, 0.2, -15] }, // hero — gaze into the field
  { pos: [-3, 0.8, 3], look: [3, 1.5, -18] }, // I — drift left, turn toward the star
  { pos: [1, 1.5, -6], look: [6.5, 2.2, -24] }, // II — approach, frame the north star
  { pos: [4.5, 2.4, -16], look: [6.5, 2.2, -24] }, // III — glide up close beside it
  { pos: [6, 2.2, -30], look: [3, 1, -50] }, // IV — pass it, look ahead into the deep
  { pos: [1, 3.5, -44], look: [0, 2.5, -75] }, // V — rise and settle toward the horizon
];

/** Live target written by GSAP, read by R3F. Seeded to the hero shot. */
export const cameraState = {
  px: SHOTS[0].pos[0],
  py: SHOTS[0].pos[1],
  pz: SHOTS[0].pos[2],
  lx: SHOTS[0].look[0],
  ly: SHOTS[0].look[1],
  lz: SHOTS[0].look[2],
};

/** Reset the live target back to a given shot (used for reduced-motion / teardown). */
export function resetCameraState(shot: Shot = SHOTS[0]) {
  cameraState.px = shot.pos[0];
  cameraState.py = shot.pos[1];
  cameraState.pz = shot.pos[2];
  cameraState.lx = shot.look[0];
  cameraState.ly = shot.look[1];
  cameraState.lz = shot.look[2];
}
