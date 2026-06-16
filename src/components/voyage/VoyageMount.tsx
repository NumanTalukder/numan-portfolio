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
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const webgl = hasWebGL();
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    const check = () => {
      const w = window.innerWidth;
      if (w === 0 && tries++ < 30) {
        timer = setTimeout(check, 100); // wait out a transient 0-width report
        return;
      }
      const ok = !reduced && w >= 1024 && webgl;
      setEnabled(ok);
      setVoyageActive(ok);
    };
    check();
    window.addEventListener("resize", check);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", check);
      setVoyageActive(false);
    };
  }, []);

  // Lift the intro veil once mounted, so the voyage fades in from the sky
  // instead of popping out of the Logbook.
  useEffect(() => {
    if (!enabled) return;
    const id = setTimeout(() => setRevealed(true), 120);
    return () => clearTimeout(id);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <ScrollController />
      <SceneMount />
      <HeroTitle />
      <Compass />
      <DockCard />
      <StopPanels />
      <div aria-hidden style={{ height: `${(STOP_COUNT + 1) * 100}vh` }} />
      {/* intro veil — fades from the sky color into the live scene */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-[90] bg-bg transition-opacity duration-1000 ease-out ${
          revealed ? "opacity-0" : "opacity-100"
        }`}
      />
    </>
  );
}
