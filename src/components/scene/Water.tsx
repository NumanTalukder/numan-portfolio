"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Palette } from "./palette";

/**
 * Stylized low-poly sea. A plane whose vertices are displaced by summed sines
 * each frame; `flatShading` derives faceted normals in-shader (no per-frame
 * normal recompute) and picks up scene lighting + fog automatically. Frozen
 * flat under reduced motion.
 */
const SIZE = 260;

export function Water({
  palette,
  reduced,
  segments,
}: {
  palette: Palette;
  reduced: boolean;
  segments: number;
}) {
  const geometry = useMemo(
    () => new THREE.PlaneGeometry(SIZE, SIZE, segments, segments),
    [segments]
  );
  const base = useMemo(
    () =>
      Float32Array.from(
        (geometry.attributes.position as THREE.BufferAttribute).array
      ),
    [geometry]
  );
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reduced || !meshRef.current) return;
    const t = state.clock.elapsedTime;
    const attr = geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      arr[i + 2] =
        Math.sin(x * 0.12 + t * 0.7) * 0.45 +
        Math.sin(y * 0.18 + t * 0.55) * 0.3 +
        Math.sin((x + y) * 0.07 - t * 0.4) * 0.22;
    }
    attr.needsUpdate = true;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, -42]}
    >
      <meshStandardMaterial
        color={palette.sea}
        flatShading
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  );
}
