"use client";

import { useEffect, useState } from "react";
import { SceneMount } from "@/components/scene/SceneMount";
import { ScrollController } from "@/components/ScrollController";
import { HeroTitle } from "./HeroTitle";
import { Compass } from "./Compass";
import { DockCard } from "./DockCard";
import { StopPanels } from "./StopPanels";
import { setVoyageActive } from "@/components/scene/voyageStore";
import { STOP_COUNT } from "@/components/scene/voyageMath";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Mounts the interactive 3D voyage only on capable clients (pointer-capable
 * desktop, motion allowed, WebGL available). Otherwise renders nothing and the
 * Logbook fallback stands. Provides the scroll spacer that gives the voyage its
 * length (hero + one screen per stop).
 */
export function VoyageMount() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const ok = !reduced && window.innerWidth >= 1024 && hasWebGL();
    setEnabled(ok);
    setVoyageActive(ok);
    return () => setVoyageActive(false);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <ScrollController />
      <SceneMount />
      <HeroTitle />
      <Compass />
      <DockCard />
      <StopPanels />
      <div
        aria-hidden
        style={{ height: `${(STOP_COUNT + 1) * 100}vh` }}
      />
    </>
  );
}
