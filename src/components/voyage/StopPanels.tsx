"use client";

import { useEffect, useRef } from "react";
import { closeStop, useOpenIndex } from "@/components/scene/voyageStore";
import { StopContent } from "@/components/sections/StopContent";
import { stops } from "@/data/content";

/**
 * The island detail overlay. When a stop opens, the camera glides toward the
 * island (CameraRig) and this panel fades in over the dimmed scene with the
 * stop's full content. Esc or the backdrop/close button dismisses it; page
 * scroll is locked meanwhile (ScrollController), so only the panel scrolls.
 */
export function StopPanels() {
  const open = useOpenIndex();
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = open !== null;
  const stop = isOpen ? stops[open] : null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeStop();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-40 flex items-start justify-center transition-opacity duration-500 sm:items-center ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className="absolute inset-0 bg-bg/75 backdrop-blur-md"
        onClick={closeStop}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={stop ? `${stop.island}: ${stop.title}` : undefined}
        className={`relative m-4 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border/70 bg-bg-elevated/90 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 sm:m-6 sm:p-10 ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.98]"
        }`}
      >
        {stop && (
          <>
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest2 text-brand">
                  {stop.island} · {stop.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
                  {stop.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={closeStop}
                aria-label="Close"
                className="shrink-0 rounded-full border border-border p-2 text-muted transition-colors hover:border-brand hover:text-brand"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <StopContent id={stop.id} />
          </>
        )}
      </div>
    </div>
  );
}
