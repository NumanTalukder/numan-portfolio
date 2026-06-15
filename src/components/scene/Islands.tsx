"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { ISLAND_POSITIONS } from "./voyagePath";
import { openStop, useActiveIndex } from "./voyageStore";
import { stops } from "@/data/content";
import type { Palette } from "./palette";

const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

function Tree({
  position,
  scale,
  palette,
}: {
  position: [number, number, number];
  scale: number;
  palette: Palette;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.06, 0.09, 0.5, 5]} />
        <meshStandardMaterial color={palette.treeTrunk} flatShading />
      </mesh>
      <mesh position={[0, 0.78, 0]}>
        <coneGeometry args={[0.34, 0.95, 6]} />
        <meshStandardMaterial color={palette.treeFoliage} flatShading roughness={1} />
      </mesh>
    </group>
  );
}

function Island({
  index,
  palette,
  texture,
}: {
  index: number;
  palette: Palette;
  texture: THREE.Texture | null;
}) {
  const pos = ISLAND_POSITIONS[index];
  const stop = stops[index];
  const group = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Sprite>(null);
  const [hovered, setHovered] = useState(false);
  const activeIndex = useActiveIndex();
  const active = activeIndex === index;

  const cfg = useMemo(() => {
    const r = (s: number) => rand(index * 13.7 + s);
    const radius = 2.2 + r(1) * 0.7;
    const height = 2.3 + r(2) * 1.0;
    const treeCount = 3 + Math.floor(r(3) * 4);
    const trees = Array.from({ length: treeCount }, (_, i) => {
      const a = r(4 + i) * Math.PI * 2;
      const rad = 0.5 + r(20 + i) * radius * 0.55;
      const h = (1 - rad / radius) * height * 0.45; // sit up the slope
      return {
        position: [Math.cos(a) * rad, h, Math.sin(a) * rad] as [
          number,
          number,
          number,
        ],
        scale: 0.6 + r(30 + i) * 0.7,
      };
    });
    return { radius, height, trees, rot: r(9) * Math.PI };
  }, [index]);

  useFrame((state) => {
    const g = group.current;
    if (g) g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, hovered ? 1.06 : 1, 0.12));
    if (halo.current) {
      const k = (active ? 1.4 : 0.9) + Math.sin(state.clock.elapsedTime * 1.3) * 0.12;
      halo.current.scale.setScalar(k);
      halo.current.material.opacity = active ? 0.7 : 0.4;
    }
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
  const open = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    openStop(index);
  };

  return (
    <group position={pos} rotation={[0, cfg.rot, 0]}>
      <group ref={group}>
        {/* invisible hitbox so the whole island is clickable */}
        <mesh
          position={[0, cfg.height * 0.5, 0]}
          onClick={open}
          onPointerOver={onOver}
          onPointerOut={onOut}
        >
          <cylinderGeometry args={[cfg.radius * 1.2, cfg.radius * 1.3, cfg.height + 1, 8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* beach ring */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[cfg.radius * 1.25, cfg.radius * 1.35, 0.5, 9]} />
          <meshStandardMaterial color={palette.sand} flatShading roughness={1} />
        </mesh>
        {/* mound */}
        <mesh position={[0, cfg.height * 0.5, 0]}>
          <coneGeometry args={[cfg.radius, cfg.height, 7]} />
          <meshStandardMaterial
            color={active || hovered ? palette.landLit : palette.land}
            flatShading
            roughness={0.95}
          />
        </mesh>

        {cfg.trees.map((t, i) => (
          <Tree key={i} position={t.position} scale={t.scale} palette={palette} />
        ))}

        {/* lighthouse atop the peak */}
        <group position={[0, cfg.height, 0]}>
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.16, 0.26, 0.9, 7]} />
            <meshStandardMaterial color={palette.deck} flatShading roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.95, 0]}>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshBasicMaterial color={palette.glow} toneMapped={false} fog={false} />
          </mesh>
          <sprite ref={halo} position={[0, 0.95, 0]} scale={1}>
            <spriteMaterial
              map={texture ?? undefined}
              color={palette.glow}
              transparent
              opacity={0.4}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
              fog={false}
            />
          </sprite>
        </group>
      </group>

      {/* Headline label — only when docked (active) or hovered. */}
      {(active || hovered) && (
        <Html
          position={[0, cfg.height + 2.4, 0]}
          center
          distanceFactor={14}
          zIndexRange={[20, 0]}
        >
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

export function Islands({
  palette,
  texture,
}: {
  palette: Palette;
  texture: THREE.Texture | null;
}) {
  return (
    <group>
      {ISLAND_POSITIONS.map((_, i) => (
        <Island key={i} index={i} palette={palette} texture={texture} />
      ))}
    </group>
  );
}
