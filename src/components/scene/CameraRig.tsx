"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SHOTS, cameraState } from "./cameraShots";

/**
 * Drives the R3F camera. Each frame it eases the camera position and a tracked
 * look-at point toward the GSAP-animated `cameraState` (frame-rate independent
 * damping), giving the slow cinematic dolly. With reduced motion the camera is
 * pinned to the hero shot and never animates.
 */
export function CameraRig({ reduced }: { reduced: boolean }) {
  const lookAt = useRef(
    new THREE.Vector3(SHOTS[0].look[0], SHOTS[0].look[1], SHOTS[0].look[2])
  );

  useFrame((state, delta) => {
    const cam = state.camera;

    if (reduced) {
      cam.position.set(SHOTS[0].pos[0], SHOTS[0].pos[1], SHOTS[0].pos[2]);
      lookAt.current.set(SHOTS[0].look[0], SHOTS[0].look[1], SHOTS[0].look[2]);
      cam.lookAt(lookAt.current);
      return;
    }

    // Exponential damping toward the scroll-driven target.
    const a = 1 - Math.exp(-5 * delta);

    cam.position.x = THREE.MathUtils.lerp(cam.position.x, cameraState.px, a);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, cameraState.py, a);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, cameraState.pz, a);

    lookAt.current.x = THREE.MathUtils.lerp(lookAt.current.x, cameraState.lx, a);
    lookAt.current.y = THREE.MathUtils.lerp(lookAt.current.y, cameraState.ly, a);
    lookAt.current.z = THREE.MathUtils.lerp(lookAt.current.z, cameraState.lz, a);

    cam.lookAt(lookAt.current);
  });

  return null;
}
