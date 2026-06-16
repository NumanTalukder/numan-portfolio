"use client";

import {
  openStop,
  useActiveIndex,
  useOpenIndex,
} from "@/components/scene/voyageStore";
import { stops } from "@/data/content";

/**
 * Fixed, always-on-screen "you've docked" card. Shows the current island's
 * headline + an Explore button whenever the ship is docked (activeIndex >= 0)
 * and no panel is open. Screen-anchored so the CTA is never off-screen (unlike
 * a 3D-anchored label, which drifts out of frame as the camera moves).
 */
export function DockCard() {
  const active = useActiveIndex();
  const open = useOpenIndex();
  const show = active >= 0 && open === null;
  const stop = active >= 0 ? stops[active] : null;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-10 z-20 flex justify-center px-5 transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      aria-hidden={!show}
    >
      {stop && (
        <div className="pointer-events-auto flex w-full max-w-sm flex-col items-center rounded-2xl border border-border/60 bg-bg/80 px-6 py-5 text-center shadow-xl backdrop-blur-md">
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-brand">
            {stop.island} · {stop.eyebrow}
          </p>
          <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight">
            {stop.title}
          </h2>
          <p className="mt-1 text-sm text-muted">{stop.teaser}</p>
          <button
            type="button"
            onClick={() => openStop(active)}
            className="mt-4 rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            Explore →
          </button>
        </div>
      )}
    </div>
  );
}
