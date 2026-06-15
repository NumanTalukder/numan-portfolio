/* eslint-disable @next/next/no-img-element */
import { profile } from "@/data/content";

/**
 * Brand wordmark. The light/dark variants are swapped purely with CSS
 * (`dark:` utilities key off the .dark class on <html>), so there is no
 * JS, no flash, and no hydration mismatch. SVGs are intrinsically crisp,
 * so a plain <img> is appropriate here (next/image optimization is for the
 * raster portrait photos later).
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <img
        src="/brand/numan-logo.svg"
        alt={`${profile.name} — ${profile.role}`}
        className="block h-12 w-auto dark:hidden sm:h-14"
        width={130}
        height={40}
      />
      <img
        src="/brand/numan-logo-dark.svg"
        alt={`${profile.name} — ${profile.role}`}
        className="hidden h-12 w-auto dark:block sm:h-14"
        width={130}
        height={40}
        aria-hidden="true"
      />
    </span>
  );
}
