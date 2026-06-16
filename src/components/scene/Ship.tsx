"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { shipAt } from "./voyagePath";
import { voyage } from "./voyageStore";
import type { Palette } from "./palette";

/** A triangular sail geometry (right angle at the mast). */
function sailGeo(height: number, depth: number) {
  const g = new THREE.BufferGeometry();
  g.setAttribute(
    "position",
    new THREE.BufferAttribute(
      new Float32Array([0, 0, 0, 0, height, 0, 0, 0, -depth]),
      3
    )
  );
  g.computeVertexNormals();
  return g;
}

/**
 * Detailed low-poly sailboat. Wooden hull with a pointed prow + raised deck and
 * cabin, a mast with a main sail and a jib, a fluttering pennant, and a warm
 * lantern (emissive sphere + point light) that keeps the ship from blending
 * into the dark water at night. Rides the path; bobs and rocks on the swell.
 */
export function Ship({
  palette,
  reduced,
  dark,
  texture,
}: {
  palette: Palette;
  reduced: boolean;
  dark: boolean;
  texture: THREE.Texture | null;
}) {
  const group = useRef<THREE.Group>(null);
  const flag = useRef<THREE.Mesh>(null);
  const wake = useRef<THREE.Sprite>(null);

  const mainSail = useMemo(() => sailGeo(1.5, 1.1), []);
  const jib = useMemo(() => sailGeo(1.0, 0.7), []);
  const pennant = useMemo(() => sailGeo(0.22, 0.5), []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const { position, tangent } = shipAt(reduced ? 0 : voyage.t);
    const t = state.clock.elapsedTime;
    g.position.set(
      position.x,
      0.18 + (reduced ? 0 : Math.sin(t * 0.9) * 0.07),
      position.z
    );
    const targetYaw = Math.atan2(tangent.x, tangent.z);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetYaw, 0.08);
    g.rotation.z = reduced ? 0 : Math.sin(t * 0.7) * 0.05;
    if (flag.current && !reduced) flag.current.rotation.y = Math.sin(t * 4) * 0.4;
    if (wake.current && !reduced)
      wake.current.material.opacity = 0.18 + Math.sin(t * 2) * 0.05;
  });

  const wood = (
    <meshStandardMaterial color={palette.hull} flatShading roughness={0.85} />
  );

  return (
    <group ref={group}>
      {/* hull body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.62, 0.34, 1.5]} />
        {wood}
      </mesh>
      {/* pointed prow (low-poly pyramid) */}
      <mesh position={[0, 0, 1.05]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.46, 0.8, 4]} />
        <meshStandardMaterial color={palette.hull} flatShading roughness={0.85} />
      </mesh>
      {/* deck */}
      <mesh position={[0, 0.2, -0.05]}>
        <boxGeometry args={[0.5, 0.06, 1.35]} />
        <meshStandardMaterial color={palette.deck} flatShading roughness={0.8} />
      </mesh>
      {/* cabin */}
      <mesh position={[0, 0.37, -0.5]}>
        <boxGeometry args={[0.42, 0.26, 0.5]} />
        <meshStandardMaterial color={palette.deck} flatShading roughness={0.8} />
      </mesh>

      {/* mast + boom */}
      <mesh position={[0, 1.0, 0.15]}>
        <cylinderGeometry args={[0.035, 0.045, 1.9, 6]} />
        {wood}
      </mesh>
      <mesh position={[0, 0.45, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.9, 5]} />
        {wood}
      </mesh>

      {/* sails — emissive so they catch starlight and read against the sea */}
      <mesh geometry={mainSail} position={[0, 0.2, 0.1]}>
        <meshStandardMaterial
          color={palette.sail}
          side={THREE.DoubleSide}
          roughness={0.7}
          emissive={palette.sail}
          emissiveIntensity={0.18}
        />
      </mesh>
      <mesh geometry={jib} position={[0, 0.2, 0.18]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial
          color={palette.sail}
          side={THREE.DoubleSide}
          roughness={0.7}
          emissive={palette.sail}
          emissiveIntensity={0.14}
        />
      </mesh>

      {/* pennant at the masthead */}
      <mesh ref={flag} geometry={pennant} position={[0, 1.9, 0.15]}>
        <meshStandardMaterial
          color={palette.glow}
          side={THREE.DoubleSide}
          emissive={palette.glow}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* lantern — only lit at night; a dark fixture by day */}
      <mesh position={[0, 0.5, 0.55]}>
        <meshBasicMaterial
          color={dark ? palette.lantern : palette.hull}
          toneMapped={false}
        />
        <sphereGeometry args={[dark ? 0.07 : 0.05, 10, 10]} />
      </mesh>
      {dark && (
        <pointLight
          position={[0, 0.6, 0.4]}
          color={palette.lantern}
          intensity={6}
          distance={6}
        />
      )}

      {/* faint foam wake trailing behind */}
      <sprite ref={wake} position={[0, 0.05, -1.4]} scale={[1.6, 2.6, 1]}>
        <spriteMaterial
          map={texture ?? undefined}
          color={palette.foam}
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  );
}
