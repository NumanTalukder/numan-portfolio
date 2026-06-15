"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { chaseCamera, closeupCamera } from "./voyagePath";
import { voyage, getOpenIndex } from "./voyageStore";

/**
 * Drives the camera. Each frame it picks a target — the chase framing trailing
 * the ship along the path, or (when an island panel is open) a closer framing
 * of that island — and eases position + look-at toward it (frame-rate
 * independent damping). The "glide in" on open is just the target swapping to
 * the closeup; the same easing carries it there.
 */
export function CameraRig({ reduced }: { reduced: boolean }) {
  const look = useRef(new THREE.Vector3(0, 0.6, 0));

  useFrame((state, delta) => {
    const cam = state.camera;
    const open = getOpenIndex();
    const target =
      open !== null ? closeupCamera(open) : chaseCamera(reduced ? 0 : voyage.t);

    const a = 1 - Math.exp(-(open !== null ? 3.5 : 5) * delta);
    cam.position.lerp(target.camPos, a);
    look.current.lerp(target.look, a);
    cam.lookAt(look.current);
  });

  return null;
}
