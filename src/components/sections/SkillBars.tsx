"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import type { Skill } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * Skill levels as instrument-panel bars that fill from zero when the section
 * scrolls into view. Reduced motion renders them filled immediately.
 */
export function SkillBars({ skills }: { skills: Skill[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const fills = Array.from(
      root.querySelectorAll<HTMLElement>("[data-skill-fill]")
    );
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      fills.forEach((el) => (el.style.width = `${el.dataset.level}%`));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(fills, {
        width: (i) => `${fills[i].dataset.level}%`,
        duration: 1.1,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <ul ref={ref} className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
      {skills.map((skill) => (
        <li key={skill.name}>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="font-medium">{skill.name}</span>
            <span className="font-mono text-xs text-muted">{skill.level}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              data-skill-fill
              data-level={skill.level}
              className="h-full rounded-full bg-brand"
              style={{ width: 0 }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
