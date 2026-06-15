"use client";

import { useVoyageActive } from "@/components/scene/voyageStore";

/**
 * Wraps the Logbook fallback. It's the SSR default (visible until the client
 * decides), and stays visible on small screens / reduced-motion / no-WebGL.
 * When the interactive voyage mounts, it's hidden.
 */
export function FallbackLayer({ children }: { children: React.ReactNode }) {
  const active = useVoyageActive();
  return (
    <div className={active ? "hidden" : ""} aria-hidden={active || undefined}>
      {children}
    </div>
  );
}
