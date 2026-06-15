"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { shipAt } from "./voyagePath";
import { voyage } from "./voyageStore";
import type { Palette } from "./palette";

/**
 * Low-poly sailboat that rides the voyage path. Position follows
 * PATH.getPoint(voyage.t); heading eases toward the path tangent; gentle bob +
 * rock on top. Frozen at the start under reduced motion.
 */
export function Ship({ palette, reduced }: { palette: Palette; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);

  const sailGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([0, 0, 0, 0, 1.5, 0, 0, 0, -1.05]),
        3
      )
    );
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const { position, tangent } = shipAt(reduced ? 0 : voyage.t);
    const t = state.clock.elapsedTime;
    g.position.set(
      position.x,
      0.3 + (reduced ? 0 : Math.sin(t * 0.9) * 0.08),
      position.z
    );
    const targetYaw = Math.atan2(tangent.x, tangent.z);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetYaw, 0.08);
    g.rotation.z = reduced ? 0 : Math.sin(t * 0.7) * 0.04;
  });

  return (
    <group ref={group}>
      {/* hull */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.22, 1.7]} />
        <meshStandardMaterial color={palette.hull} flatShading roughness={0.8} />
      </mesh>
      {/* bow wedge */}
      <mesh position={[0, 0, 1.0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.36, 0.22, 0.36]} />
        <meshStandardMaterial color={palette.hull} flatShading roughness={0.8} />
      </mesh>
      {/* mast */}
      <mesh position={[0, 0.85, 0.1]}>
        <cylinderGeometry args={[0.03, 0.03, 1.5, 6]} />
        <meshStandardMaterial color={palette.hull} flatShading />
      </mesh>
      {/* sail — catches starlight */}
      <mesh geometry={sailGeometry} position={[0, 0.18, 0.12]}>
        <meshStandardMaterial
          color={palette.sail}
          side={THREE.DoubleSide}
          roughness={0.7}
          emissive={palette.sail}
          emissiveIntensity={0.12}
        />
      </mesh>
    </group>
  );
}
