"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ISLAND_POSITIONS, chaseCamera, closeupCamera } from "./voyagePath";
import { STOP_COUNT } from "./voyageMath";
import { voyage, getOpenIndex } from "./voyageStore";

/**
 * Drives the camera. While sailing it trails the ship (chase framing); as it
 * nears a dock it swings to frame that island (so the island + its dock card
 * read clearly); when a panel opens it glides into a close framing. Eased each
 * frame (frame-rate independent damping).
 */
export function CameraRig({ reduced }: { reduced: boolean }) {
  const look = useRef(new THREE.Vector3(0, 0.6, 0));
  const tmp = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const cam = state.camera;
    const open = getOpenIndex();

    let camPos: THREE.Vector3;
    let target: THREE.Vector3;

    if (open !== null) {
      const c = closeupCamera(open);
      camPos = c.camPos;
      target = c.look;
    } else {
      const t = reduced ? 0 : voyage.t;
      const base = chaseCamera(t);
      camPos = base.camPos;
      target = base.look;

      // Near a dock, look toward that island so it's framed (not off to the side).
      const nearest = Math.round(t * STOP_COUNT);
      const islandIdx = nearest - 1; // -1 = hero / open sea
      const proximity = 1 - Math.min(1, Math.abs(t * STOP_COUNT - nearest) / 0.5);
      if (islandIdx >= 0 && proximity > 0) {
        const isl = ISLAND_POSITIONS[islandIdx];
        tmp.current.set(isl.x, isl.y + 1.6, isl.z);
        target.lerp(tmp.current, proximity * 0.7);
      }
    }

    const a = 1 - Math.exp(-(open !== null ? 3.5 : 4.5) * delta);
    cam.position.lerp(camPos, a);
    look.current.lerp(target, a);
    cam.lookAt(look.current);
  });

  return null;
}
