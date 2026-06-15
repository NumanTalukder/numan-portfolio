"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CameraRig } from "./CameraRig";

/* ------------------------------------------------------------------ theme -- */
/**
 * Atmosphere palette per theme. The container gradient is plain CSS (instant,
 * crisp) while fog/star/north-star colors are fed into the WebGL scene. Dark =
 * deep blue-black night sea; light = soft dawn over a calm horizon.
 */
type Palette = {
  gradient: string;
  fog: string;
  star: string;
  starOpacity: number;
  starAdditive: boolean;
  core: string;
  glow: string;
};

const PALETTES: Record<"dark" | "light", Palette> = {
  dark: {
    gradient:
      "radial-gradient(125% 90% at 50% -10%, #13234a 0%, #0B1120 46%, #04060d 100%)",
    fog: "#070d1c",
    star: "#bcd6f7",
    starOpacity: 0.9,
    starAdditive: true,
    core: "#eaf6ff",
    glow: "#38bdf8",
  },
  light: {
    gradient:
      "radial-gradient(125% 95% at 50% 112%, #fde3c6 0%, #f3e0e8 24%, #e6eefb 52%, #eef3fb 78%, #F8FAFC 100%)",
    fog: "#e2eaf6",
    star: "#6b82a6",
    starOpacity: 0.5,
    starAdditive: false,
    core: "#fff4e2",
    glow: "#f6b35a",
  },
};

/* ------------------------------------------------------------- small hooks -- */
function useParticleCount() {
  // Lighter starfield on small screens. Resolved once on mount (window exists
  // because this whole tree is client-only / ssr:false).
  const [count, setCount] = useState(2600);
  useEffect(() => {
    setCount(window.innerWidth < 768 ? 1400 : 2600);
  }, []);
  return count;
}

/** Soft circular sprite so points read as round stars, not squares. */
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
      arr[i * 3] = (Math.random() * 2 - 1) * 55; // x spread
      arr[i * 3 + 1] = (Math.random() * 2 - 1) * 28 + 4; // y, biased upward (sky)
      // z kept well ahead of the camera (at z=8) so no star sits on the lens
      // and balloons under size attenuation.
      arr[i * 3 + 2] = -14 - Math.random() * 126;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g || reduced) return;
    // Slow continuous drift...
    g.rotation.y += delta * 0.008;
    // ...plus a gentle mouse parallax that eases toward the pointer.
    g.position.x = THREE.MathUtils.lerp(g.position.x, state.pointer.x * 1.6, 0.04);
    g.position.y = THREE.MathUtils.lerp(g.position.y, state.pointer.y * 1.0, 0.04);
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
          size={0.55}
          sizeAttenuation
          transparent
          opacity={palette.starOpacity}
          depthWrite={false}
          alphaTest={0.01}
          blending={
            palette.starAdditive
              ? THREE.AdditiveBlending
              : THREE.NormalBlending
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
    // Faint breathing pulse on the halo only.
    const t = state.clock.elapsedTime;
    const k = 0.85 + Math.sin(t * 0.9) * 0.12;
    s.scale.setScalar(4.4 * k);
  });

  return (
    <group position={[6.5, 2.2, -24]}>
      {/* bright core — unlit so it always reads as a light source */}
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={palette.core} toneMapped={false} />
      </mesh>
      {/* additive halo (stand-in for the bloom added in Phase 4) */}
      <sprite ref={glowRef} scale={[4.4, 4.4, 1]}>
        <spriteMaterial
          map={texture ?? undefined}
          color={palette.glow}
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
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
}: {
  palette: Palette;
  reduced: boolean;
  count: number;
}) {
  const texture = useSoftCircleTexture();
  return (
    <>
      <fog attach="fog" args={[palette.fog, 18, 120]} />
      <CameraRig reduced={reduced} />
      <Starfield
        count={count}
        palette={palette}
        reduced={reduced}
        texture={texture}
      />
      <NorthStar palette={palette} reduced={reduced} texture={texture} />
    </>
  );
}

/* ------------------------------------------------------------------- canvas -- */
export function Scene() {
  const { resolvedTheme } = useTheme();
  const reduced = usePrefersReducedMotion();
  const count = useParticleCount();

  // Default to the dark palette until the theme resolves (this tree is
  // client-only, so this is a single tick).
  const palette = resolvedTheme === "light" ? PALETTES.light : PALETTES.dark;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: palette.gradient }}
    >
      <Canvas
        dpr={[1, 2]}
        frameloop={reduced ? "demand" : "always"}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8], fov: 55 }}
      >
        <SceneContents palette={palette} reduced={reduced} count={count} />
      </Canvas>
    </div>
  );
}
