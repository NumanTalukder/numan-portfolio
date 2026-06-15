"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Palette } from "./palette";

/**
 * Stylized low-poly sea. Vertices are displaced by summed sines each frame and
 * tinted by wave height (deep troughs → sea → foam crests) via vertex colors;
 * `flatShading` derives faceted normals in-shader so the swell catches light.
 * Frozen flat under reduced motion.
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
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(SIZE, SIZE, segments, segments);
    const count = g.attributes.position.count;
    g.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(count * 3), 3)
    );
    return g;
  }, [segments]);

  const base = useMemo(
    () =>
      Float32Array.from(
        (geometry.attributes.position as THREE.BufferAttribute).array
      ),
    [geometry]
  );

  const colors = useMemo(
    () => ({
      deep: new THREE.Color(palette.seaDeep),
      sea: new THREE.Color(palette.sea),
      foam: new THREE.Color(palette.foam),
    }),
    [palette.seaDeep, palette.sea, palette.foam]
  );

  const meshRef = useRef<THREE.Mesh>(null);

  const wave = (x: number, y: number, t: number) =>
    Math.sin(x * 0.11 + t * 0.7) * 0.55 +
    Math.sin(y * 0.17 + t * 0.5) * 0.4 +
    Math.sin((x + y) * 0.07 - t * 0.4) * 0.3 +
    Math.sin((x - y) * 0.31 + t * 0.9) * 0.14;

  const paint = (t: number) => {
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const col = geometry.attributes.color as THREE.BufferAttribute;
    const parr = pos.array as Float32Array;
    const carr = col.array as Float32Array;
    const c = new THREE.Color();
    for (let i = 0; i < parr.length; i += 3) {
      const h = wave(base[i], base[i + 1], t);
      parr[i + 2] = h;
      // troughs deep, crests foamy
      if (h > 0.6) {
        c.copy(colors.sea).lerp(colors.foam, Math.min(1, (h - 0.6) / 0.55));
      } else {
        c.copy(colors.deep).lerp(colors.sea, (h + 1.4) / 2.0);
      }
      carr[i] = c.r;
      carr[i + 1] = c.g;
      carr[i + 2] = c.b;
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;
  };

  // Initial paint (also the static frame under reduced motion).
  useMemo(() => paint(0), [geometry, colors]); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((state) => {
    if (reduced || !meshRef.current) return;
    paint(state.clock.elapsedTime);
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, -42]}
    >
      <meshStandardMaterial
        vertexColors
        flatShading
        roughness={0.85}
        metalness={0.08}
      />
    </mesh>
  );
}
