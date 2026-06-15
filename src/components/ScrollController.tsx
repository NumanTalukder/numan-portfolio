"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SHOTS, cameraState, resetCameraState } from "@/components/scene/cameraShots";
import { setLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scroll + scroll-driven camera. Renders nothing.
 *
 * - Lenis owns smooth scrolling; its scroll event drives ScrollTrigger.update
 *   and gsap's ticker drives Lenis's raf loop (the canonical wiring).
 * - ONE master timeline, scrubbed by overall page progress, tweens the shared
 *   `cameraState` through the cinematic shots. The R3F <CameraRig/> eases the
 *   real camera toward that target each frame.
 * - prefers-reduced-motion: no Lenis, no timeline — native scroll and a static
 *   camera pinned to the hero shot.
 */
export function ScrollController() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      resetCameraState();
      return;
    }

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Seed the hero shot, then chain one eased tween per subsequent shot. With
    // equal durations under scrub, the shots are spaced evenly across the page.
    resetCameraState(SHOTS[0]);
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 1 },
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    for (let i = 1; i < SHOTS.length; i++) {
      const { pos, look } = SHOTS[i];
      tl.to(cameraState, {
        px: pos[0],
        py: pos[1],
        pz: pos[2],
        lx: look[0],
        ly: look[1],
        lz: look[2],
      });
    }

    // Recompute trigger positions once layout/fonts settle.
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      tl.scrollTrigger?.kill();
      tl.kill();
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return null;
}
