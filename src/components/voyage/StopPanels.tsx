"use client";

import { useEffect, useRef } from "react";
import { closeStop, useOpenIndex } from "@/components/scene/voyageStore";
import { StopContent } from "@/components/sections/StopContent";
import { stops } from "@/data/content";

/**
 * The island detail overlay. When a stop opens, the camera glides toward the
 * island (CameraRig) and this panel fades in over the dimmed scene with the
 * stop's full content.
 *
 * Notes from bugfixes:
 * - z-[70] so it sits ABOVE the fixed nav (z-50); otherwise on mobile the panel
 *   starts under the nav and the close button isn't tappable.
 * - The scroll body carries `data-lenis-prevent` so Lenis lets it scroll
 *   natively (Lenis otherwise swallows the wheel/touch and locks it).
 * - A fixed header keeps the close button reachable while the body scrolls.
 */
export function StopPanels() {
  const open = useOpenIndex();
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const isOpen = open !== null;
  const stop = isOpen ? stops[open] : null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeStop();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-stretch justify-center transition-opacity duration-500 sm:items-center ${
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
        className={`relative m-3 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border/70 bg-bg-elevated/95 shadow-2xl backdrop-blur-xl transition-all duration-500 sm:m-6 sm:max-h-[88vh] ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.98]"
        }`}
      >
        {stop && (
          <>
            {/* fixed header — close stays reachable while the body scrolls */}
            <div className="flex items-center justify-between gap-4 border-b border-border/50 px-6 py-4 sm:px-10">
              <p className="truncate font-mono text-xs uppercase tracking-widest2 text-brand">
                {stop.island} · {stop.eyebrow}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={closeStop}
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-brand hover:text-brand"
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

            {/* scrollable body (Lenis leaves it alone via data-lenis-prevent) */}
            <div
              ref={bodyRef}
              data-lenis-prevent
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-8 sm:px-10"
            >
              <h2 className="mb-8 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
                {stop.title}
              </h2>
              <StopContent id={stop.id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
