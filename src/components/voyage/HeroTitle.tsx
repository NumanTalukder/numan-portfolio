"use client";

import { useActiveIndex } from "@/components/scene/voyageStore";
import { profile } from "@/data/content";

/**
 * The opening title, overlaid on the open-sea hero. Visible while the ship is
 * still at the start (activeIndex === -1) and fades out as it sets sail.
 */
export function HeroTitle() {
  const activeIndex = useActiveIndex();
  const visible = activeIndex < 0;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-20 flex items-center px-5 transition-opacity duration-700 sm:px-8 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto w-full max-w-content">
        <p className="font-mono text-xs uppercase tracking-widest2 text-brand">
          {profile.location}
        </p>
        <h1 className="mt-5 font-display text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-8xl">
          {profile.name}
        </h1>
        <p className="mt-4 font-display text-2xl font-bold text-muted sm:text-4xl">
          {profile.role}
        </p>
        <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-muted">
          {profile.roleSub}
        </p>
        <p className="mt-6 max-w-xl text-lg text-muted">{profile.tagline}</p>
      </div>

      <span className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest2 text-muted">
        scroll to set sail ↓
      </span>
    </div>
  );
}
