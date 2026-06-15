"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";
import { SNAP_TS, activeStopFromT } from "@/components/scene/voyageMath";
import { voyage, setActiveIndex, useOpenIndex } from "@/components/scene/voyageStore";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the voyage from scroll. Lenis owns smooth scrolling and feeds
 * ScrollTrigger; one ScrollTrigger maps overall page progress → `voyage.t`
 * (read each frame by the scene) and snaps to each island's dock (SNAP_TS).
 * While an island panel is open, scrolling is locked. Renders nothing.
 */
export function ScrollController() {
  const open = useOpenIndex();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    setLenis(lenis);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      snap: {
        snapTo: SNAP_TS,
        duration: { min: 0.25, max: 0.7 },
        ease: "power2.inOut",
      },
      onUpdate: (self) => {
        voyage.t = self.progress;
        setActiveIndex(activeStopFromT(self.progress));
      },
    });

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      st.kill();
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Lock scrolling while an island panel is open.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (open !== null) lenis.stop();
    else lenis.start();
  }, [open]);

  return null;
}
