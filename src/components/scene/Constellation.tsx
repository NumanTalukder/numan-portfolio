"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { ISLAND_POSITIONS } from "./voyagePath";
import type { Palette } from "./palette";

/**
 * A faint trail of guide-stars arcing from island to island — the constellation
 * that points the way onward. Bloom gives them their glow.
 */
export function Constellation({
  palette,
  texture,
}: {
  palette: Palette;
  texture: THREE.Texture | null;
}) {
  const positions = useMemo(() => {
    const pts: number[] = [];
    const N = 6;
    for (let i = 0; i < ISLAND_POSITIONS.length - 1; i++) {
      const a = ISLAND_POSITIONS[i].clone().setY(5);
      const b = ISLAND_POSITIONS[i + 1].clone().setY(5);
      for (let j = 1; j < N; j++) {
        const t = j / N;
        const p = a.clone().lerp(b, t);
        p.y += Math.sin(t * Math.PI) * 2.6; // arc upward
        pts.push(p.x, p.y, p.z);
      }
    }
    return new Float32Array(pts);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture ?? undefined}
        color={palette.glow}
        size={0.55}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        fog={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
