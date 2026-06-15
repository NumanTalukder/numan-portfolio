"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Palette } from "./palette";

type Spec = {
  x: number;
  z: number;
  period: number;
  phase: number;
  height: number;
  dir: number;
};

/**
 * A few fish that periodically arc out of the sea along the route. Each fish
 * spends most of its cycle hidden below the surface, then leaps in a short
 * parabola, nose pitching up then down. Cheap: a handful of tiny meshes.
 */
function Fish({ spec, palette }: { spec: Spec; palette: Palette }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const c = ((state.clock.elapsedTime + spec.phase) % spec.period) / spec.period;
    const jump = 0.28; // fraction of the cycle spent airborne
    if (c < jump) {
      const p = c / jump; // 0..1 over the leap
      g.visible = true;
      g.position.set(
        spec.x + spec.dir * (p - 0.5) * 1.6,
        Math.sin(p * Math.PI) * spec.height,
        spec.z
      );
      g.rotation.z = spec.dir * (0.5 - p) * Math.PI * 1.1;
    } else {
      g.visible = false;
    }
  });

  return (
    <group ref={ref} visible={false} scale={0.6}>
      <mesh scale={[0.32, 0.18, 0.6]}>
        <sphereGeometry args={[0.5, 8, 6]} />
        <meshStandardMaterial
          color={palette.fish}
          flatShading
          roughness={0.5}
          metalness={0.3}
          emissive={palette.fish}
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh position={[0, 0, -0.32]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.16, 0.26, 4]} />
        <meshStandardMaterial color={palette.fish} flatShading roughness={0.5} />
      </mesh>
    </group>
  );
}

export function FishSchool({ palette }: { palette: Palette }) {
  const specs = useMemo<Spec[]>(() => {
    const rnd = (s: number) => {
      const x = Math.sin(s * 91.7) * 9999;
      return x - Math.floor(x);
    };
    return Array.from({ length: 7 }, (_, i) => ({
      x: (rnd(i + 1) - 0.5) * 16,
      z: 4 - i * 14 - rnd(i + 5) * 6, // spread down the route
      period: 5 + rnd(i + 9) * 5,
      phase: rnd(i + 13) * 6,
      height: 0.8 + rnd(i + 17) * 0.7,
      dir: rnd(i + 21) > 0.5 ? 1 : -1,
    }));
  }, []);

  return (
    <group>
      {specs.map((spec, i) => (
        <Fish key={i} spec={spec} palette={palette} />
      ))}
    </group>
  );
}
