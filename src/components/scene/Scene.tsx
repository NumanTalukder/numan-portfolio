"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { PALETTES, type Palette } from "./palette";
import { CameraRig } from "./CameraRig";
import { Water } from "./Water";
import { Islands } from "./Islands";
import { Ship } from "./Ship";
import { FishSchool } from "./Fish";
import { Birds } from "./Birds";

/* ------------------------------------------------------------- small hooks -- */
function useParticleCount() {
  const [count, setCount] = useState(2200);
  useEffect(() => {
    setCount(window.innerWidth < 768 ? 1200 : 2200);
  }, []);
  return count;
}

function useSoftCircleTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.75)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

/* ----------------------------------------------------------------- starfield -- */
function Starfield({
  count,
  palette,
  reduced,
  texture,
}: {
  count: number;
  palette: Palette;
  reduced: boolean;
  texture: THREE.Texture | null;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() * 2 - 1) * 90;
      arr[i * 3 + 1] = Math.random() * 40 + 6; // above the horizon
      arr[i * 3 + 2] = -20 - Math.random() * 130;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g || reduced) return;
    g.rotation.y += delta * 0.006;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={texture ?? undefined}
          color={palette.star}
          size={0.5}
          sizeAttenuation
          transparent
          opacity={palette.starOpacity}
          depthWrite={false}
          alphaTest={0.01}
          fog={false}
          blending={
            palette.starAdditive ? THREE.AdditiveBlending : THREE.NormalBlending
          }
        />
      </points>
    </group>
  );
}

/* ---------------------------------------------------------------- north star -- */
function NorthStar({
  palette,
  reduced,
  texture,
}: {
  palette: Palette;
  reduced: boolean;
  texture: THREE.Texture | null;
}) {
  const glowRef = useRef<THREE.Sprite>(null);

  useFrame((state) => {
    const s = glowRef.current;
    if (!s || reduced) return;
    const k = 0.85 + Math.sin(state.clock.elapsedTime * 0.9) * 0.12;
    s.scale.setScalar(5 * k);
  });

  // Far ahead, above the final island — the guide the whole voyage aims at.
  return (
    <group position={[0, 16, -120]}>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={palette.core} toneMapped={false} fog={false} />
      </mesh>
      <sprite ref={glowRef} scale={[5, 5, 1]}>
        <spriteMaterial
          map={texture ?? undefined}
          color={palette.glow}
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          fog={false}
        />
      </sprite>
    </group>
  );
}

/* ----------------------------------------------------------------------- moon -- */
function Moon({
  palette,
  texture,
}: {
  palette: Palette;
  texture: THREE.Texture | null;
}) {
  return (
    <group position={[-34, 30, -88]}>
      <mesh>
        <circleGeometry args={[3, 32]} />
        <meshBasicMaterial color={palette.moonColor} toneMapped={false} fog={false} />
      </mesh>
      <sprite scale={[16, 16, 1]}>
        <spriteMaterial
          map={texture ?? undefined}
          color={palette.moonColor}
          transparent
          opacity={0.28}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          fog={false}
        />
      </sprite>
    </group>
  );
}

/* --------------------------------------------------------------- scene graph -- */
function SceneContents({
  palette,
  reduced,
  count,
  dark,
}: {
  palette: Palette;
  reduced: boolean;
  count: number;
  dark: boolean;
}) {
  const texture = useSoftCircleTexture();
  return (
    <>
      <fog attach="fog" args={[palette.fog, palette.fogNear, palette.fogFar]} />
      <ambientLight intensity={palette.ambient} />
      <directionalLight position={[12, 18, 6]} intensity={palette.moon} color="#dbe6ff" />

      <CameraRig reduced={reduced} />
      <Water palette={palette} reduced={reduced} segments={90} />
      <Islands palette={palette} texture={texture} />
      <Ship palette={palette} reduced={reduced} dark={dark} texture={texture} />
      <FishSchool palette={palette} />
      <Birds palette={palette} />
      <Starfield count={count} palette={palette} reduced={reduced} texture={texture} />
      <NorthStar palette={palette} reduced={reduced} texture={texture} />
      {dark && <Moon palette={palette} texture={texture} />}
    </>
  );
}

/* ------------------------------------------------------------------- canvas -- */
export function Scene() {
  const { resolvedTheme } = useTheme();
  const reduced = usePrefersReducedMotion();
  const count = useParticleCount();

  const dark = resolvedTheme !== "light";
  const palette = dark ? PALETTES.dark : PALETTES.light;

  return (
    <div
      className="fixed inset-0 z-0"
      style={{ background: palette.gradient }}
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 4.6, 24], fov: 50 }}
      >
        <SceneContents palette={palette} reduced={reduced} count={count} dark={dark} />
      </Canvas>
    </div>
  );
}
