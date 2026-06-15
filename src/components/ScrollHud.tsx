"use client";

import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/lenis";
import type { Chapter } from "@/data/content";

/**
 * Slim scroll-progress bar (top) + chapter dots (right edge) for navigation.
 * Progress tracks overall scroll; the active dot is the chapter nearest the
 * viewport center (IntersectionObserver). Dots scroll smoothly via Lenis.
 */
export function ScrollHud({ chapters }: { chapters: Chapter[] }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // a thin band across the viewport middle
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <>
      {/* top progress bar */}
      <div
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      {/* chapter dots */}
      <nav
        aria-label="Chapters"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      >
        {chapters.map((c) => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => scrollToId(c.id)}
              aria-label={`${c.marker}: ${c.title}`}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex items-center"
            >
              <span
                className={`block rounded-full border transition-all duration-300 ${
                  isActive
                    ? "h-3 w-3 border-brand bg-brand"
                    : "h-2 w-2 border-muted/60 bg-transparent group-hover:border-brand"
                }`}
              />
              <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-full bg-bg-elevated px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                {c.title}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
