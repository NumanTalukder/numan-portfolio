"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/**
 * Image with a graceful branded fallback. The demo image paths in content.ts
 * may not exist yet (real photos drop in later); if loading fails we render a
 * tasteful gradient placeholder with a label instead of a broken image.
 *
 * Phase 0 uses a plain <img>; the brief defers next/image optimization of the
 * portrait photos to a later phase.
 */
export function Media({
  src,
  alt,
  label,
  className,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The image may finish loading (or fail) during SSR / before React attaches
  // the onError handler, so the error event can be missed. On mount, catch any
  // image that already resolved to a broken state.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, [src]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={clsx(
          "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/25 via-accent/10 to-ink/30",
          className
        )}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgb(var(--brand)/0.35), transparent 55%)",
          }}
          aria-hidden="true"
        />
        <span className="relative font-mono text-xs uppercase tracking-widest text-fg/70">
          {label ?? "Image"}
        </span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={clsx("h-full w-full object-cover", className)}
    />
  );
}
