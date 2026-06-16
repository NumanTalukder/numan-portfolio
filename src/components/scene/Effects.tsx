"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

/**
 * Postprocessing: a soft bloom so the north star, beacons, moon and lantern
 * actually glow, plus a gentle vignette to focus the frame. Threshold keeps the
 * bloom to genuinely bright (emissive/unlit) elements. Only mounted on the
 * desktop voyage and when motion is allowed.
 */
export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.6}
        luminanceSmoothing={0.25}
        intensity={0.62}
        radius={0.72}
        mipmapBlur
      />
      <Vignette offset={0.32} darkness={0.45} eskil={false} />
    </EffectComposer>
  );
}
