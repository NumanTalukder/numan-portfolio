"use client";

import { openStop, useActiveIndex, useOpenIndex } from "@/components/scene/voyageStore";
import { stops } from "@/data/content";

/**
 * Island navigator. Lists every stop; highlights the docked one; clicking opens
 * that island's panel. Real buttons, so the whole voyage is keyboard-navigable
 * even though the islands themselves are 3D.
 */
export function Compass() {
  const activeIndex = useActiveIndex();
  const openIndex = useOpenIndex();

  return (
    <nav
      aria-label="Voyage map"
      className={`pointer-events-none fixed right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1 transition-opacity duration-300 md:flex ${
        openIndex !== null ? "opacity-0" : "opacity-100"
      }`}
    >
      {stops.map((stop, i) => {
        const active = activeIndex === i;
        return (
          <button
            key={stop.id}
            type="button"
            onClick={() => openStop(i)}
            aria-current={active ? "true" : undefined}
            className="group pointer-events-auto flex items-center justify-end gap-3 py-1 text-right"
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                active
                  ? "text-brand opacity-100"
                  : "text-muted opacity-0 group-hover:opacity-100"
              }`}
            >
              {stop.island}
            </span>
            <span
              className={`block rounded-full border transition-all duration-300 ${
                active
                  ? "h-3 w-3 border-brand bg-brand"
                  : "h-2 w-2 border-muted/60 bg-transparent group-hover:border-brand"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
