"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import type { Chapter } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * A chapter's marker + title + body. Scrubbed to its enclosing chapter section,
 * it fades/slides in as the chapter (and its camera shot) becomes active and
 * fades out as the next begins — the cinematic beat the brief calls for. Under
 * reduced motion it simply renders, fully visible.
 */
export function ChapterHeading({ chapter }: { chapter: Chapter }) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = el.closest("[data-chapter-section]") ?? el;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 30%",
          scrub: true,
        },
      });
      tl.fromTo(
        el,
        { autoAlpha: 0, y: 44 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }
      )
        .to(el, { autoAlpha: 1, duration: 1.8 }) // hold while the shot is active
        .to(el, { autoAlpha: 0, y: -28, duration: 1, ease: "power2.in" });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-widest2 text-brand">
        {chapter.marker}
      </p>
      <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
        {chapter.title}
      </h2>
      <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
        {chapter.body}
      </p>
    </div>
  );
}
