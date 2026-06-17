"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ISLAND_POSITIONS } from "./voyagePath";
import type { Palette } from "./palette";

const wingGeo = (() => {
  const g = new THREE.BufferGeometry();
  // a single (right) wing triangle; the left is mirrored via scale.x = -1
  g.setAttribute(
    "position",
    new THREE.BufferAttribute(
      new Float32Array([0, 0, 0, 1, 0, -0.2, 0, 0, -0.55]),
      3
    )
  );
  g.computeVertexNormals();
  return g;
})();

function Bird({
  center,
  radius,
  height,
  speed,
  phase,
  palette,
}: {
  center: THREE.Vector3;
  radius: number;
  height: number;
  speed: number;
  phase: number;
  palette: Palette;
}) {
  const group = useRef<THREE.Group>(null);
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const a = t * speed + phase;
    g.position.set(
      center.x + Math.cos(a) * radius,
      center.y + height + Math.sin(t * 0.6 + phase) * 0.5,
      center.z + Math.sin(a) * radius
    );
    g.rotation.y = -a + Math.PI / 2; // face along the circle
    const flap = Math.sin(t * 9 + phase) * 0.6;
    if (left.current) left.current.rotation.z = flap;
    if (right.current) right.current.rotation.z = -flap;
  });

  return (
    <group ref={group} scale={0.5}>
      <mesh ref={right} geometry={wingGeo}>
        <meshBasicMaterial color={palette.bird} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={left} geometry={wingGeo} scale={[-1, 1, 1]}>
        <meshBasicMaterial color={palette.bird} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/** Small flocks circling above a few islands. */
export function Birds({ palette, mobile }: { palette: Palette; mobile: boolean }) {
  const flocks = useMemo(() => {
    const islandIdx = mobile ? [2, 4] : [1, 3, 5];
    const perFlock = mobile ? 2 : 3;
    return islandIdx.flatMap((idx, f) => {
      const center = ISLAND_POSITIONS[idx]
        .clone()
        .add(new THREE.Vector3(1.5, 5.5, 1));
      return Array.from({ length: perFlock }, (_, i) => ({
        key: `${f}-${i}`,
        center,
        radius: 3 + i * 0.8,
        height: i * 0.6,
        speed: 0.35 + i * 0.05,
        phase: (i / 3) * Math.PI * 2 + f,
      }));
    });
  }, [mobile]);

  return (
    <group>
      {flocks.map((b) => (
        <Bird
          key={b.key}
          center={b.center}
          radius={b.radius}
          height={b.height}
          speed={b.speed}
          phase={b.phase}
          palette={palette}
        />
      ))}
    </group>
  );
}
