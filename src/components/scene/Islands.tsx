"use client";

import { useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { ISLAND_POSITIONS } from "./voyagePath";
import { openStop, useActiveIndex } from "./voyageStore";
import { stops } from "@/data/content";
import type { Palette } from "./palette";

function Island({ index, palette }: { index: number; palette: Palette }) {
  const pos = ISLAND_POSITIONS[index];
  const stop = stops[index];
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const activeIndex = useActiveIndex();
  const active = activeIndex === index;

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const target = hovered ? 1.07 : 1;
    const s = THREE.MathUtils.lerp(g.scale.x, target, 0.12);
    g.scale.setScalar(s);
  });

  const onOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };
  const onOut = () => {
    setHovered(false);
    document.body.style.cursor = "";
  };

  return (
    <group position={pos}>
      <group ref={group}>
        {/* island mound — the click target */}
        <mesh
          position={[0, 1.0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            openStop(index);
          }}
          onPointerOver={onOver}
          onPointerOut={onOut}
        >
          <coneGeometry args={[2.5, 2.7, 7]} />
          <meshStandardMaterial
            color={active || hovered ? palette.landLit : palette.land}
            flatShading
            roughness={0.95}
          />
        </mesh>
        {/* beacon */}
        <mesh position={[0, 2.7, 0]}>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshBasicMaterial color={palette.glow} toneMapped={false} />
        </mesh>
        <pointLight
          position={[0, 3, 0]}
          color={palette.glow}
          intensity={active ? 7 : 3}
          distance={12}
        />
      </group>

      {/* Headline label — only when docked (active) or hovered, so distant
          islands stay uncluttered. */}
      {(active || hovered) && (
        <Html position={[0, 4.6, 0]} center distanceFactor={14} zIndexRange={[20, 0]}>
          <button
            type="button"
            onClick={() => openStop(index)}
            className="pointer-events-auto flex w-48 flex-col items-center rounded-xl border border-brand/60 bg-bg/85 px-3 py-2 text-center shadow-lg backdrop-blur-md"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-brand">
              {stop.eyebrow}
            </span>
            <span className="font-display text-sm font-bold leading-tight text-fg">
              {stop.island}
            </span>
            <span className="mt-0.5 text-[11px] leading-tight text-muted">
              {stop.teaser}
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-brand">
              Tap to explore
            </span>
          </button>
        </Html>
      )}
    </group>
  );
}

export function Islands({ palette }: { palette: Palette }) {
  return (
    <group>
      {ISLAND_POSITIONS.map((_, i) => (
        <Island key={i} index={i} palette={palette} />
      ))}
    </group>
  );
}
