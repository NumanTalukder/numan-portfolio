import { StopContent } from "@/components/sections/StopContent";
import { profile, stops } from "@/data/content";

/**
 * The "Logbook": a clean, fully readable vertical rendering of the whole voyage.
 * It's the SSR baseline (so all content is crawlable and works without JS) and
 * the experience served on small screens, reduced-motion, or no-WebGL — see
 * FallbackLayer / VoyageMount.
 */
export function Logbook() {
  return (
    <div className="relative z-10">
      <header className="flex min-h-[70vh] items-center px-5 pt-24 sm:px-8">
        <div className="mx-auto w-full max-w-content">
          <p className="font-mono text-xs uppercase tracking-widest2 text-brand">
            {profile.location}
          </p>
          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 font-display text-2xl font-bold text-muted sm:text-3xl">
            {profile.role}
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-muted">
            {profile.roleSub}
          </p>
          <p className="mt-6 max-w-xl text-lg text-muted">{profile.tagline}</p>
        </div>
      </header>

      <main>
        {stops.map((stop) => (
          <section
            key={stop.id}
            id={stop.id}
            className="scroll-mt-24 border-t border-border/50 px-5 py-20 sm:px-8 sm:py-28"
          >
            <div className="mx-auto max-w-content">
              <p className="font-mono text-xs uppercase tracking-widest2 text-brand">
                {stop.island} · {stop.eyebrow}
              </p>
              <h2 className="mb-10 mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
                {stop.title}
              </h2>
              <StopContent id={stop.id} />
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.fullName}. All rights reserved.
          </p>
          <p className="font-mono text-xs">Built with Next.js · Three.js · GSAP</p>
          <a
            href="#top"
            className="rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:border-brand hover:text-brand"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
