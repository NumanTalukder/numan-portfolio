# Claude Code — Phased Build Prompts

Paste these into Claude Code **one at a time**, in order. Wait for each to finish, run it, eyeball the result, then move on. Don't paste the next prompt until the current phase actually works.

Before Phase 0: put `BUILD-BRIEF.md` in your repo and the three logo files + your two photos somewhere handy.

---

## PHASE 0 — Scaffold + theme + content layer
**Goal: a running Next.js app with theme toggle and the content file. No 3D yet. Deployable.**

```
Read BUILD-BRIEF.md — it's the full spec for this project. We're building it in phases; this is Phase 0.

Set up a new Next.js 15 (App Router) + TypeScript + TailwindCSS project. Then:
1. Install deps we'll need later but set up now: three, @react-three/fiber, @react-three/drei, gsap, lenis, clsx.
2. Create src/data/content.ts exactly per the spec's content model, with the demo projects, chapters, skills, and profile. Use placeholder text for chapter bodies (2-3 sentences each, written in a calm, confident first-person voice for a software engineer).
3. Build the design-token system in Tailwind config + CSS variables: primary #0EA5E9, accent #38BDF8, ink #0F172A, dark bg #0B1120, light bg #F8FAFC. Fonts: Syne (display), Space Grotesk (body), Space Mono (mono) via next/font.
4. Implement a light/dark theme system: respects prefers-color-scheme on first visit, user-toggleable via a button, persists in localStorage, no flash of wrong theme on load (use a blocking inline script or next-themes).
5. Put the logo files in /public/brand/ and wire numan-mark.svg as the favicon. Add a minimal top nav with the logo (switches light/dark variant) and the theme toggle.
6. Build a SIMPLE placeholder homepage: hero with name + "Software Engineer", an about section with the tea-garden photo, a projects grid from content.ts, and a contact section. Plain, no animation yet — just clean, responsive, both themes working.

Acceptance: app runs, both themes look good, content all comes from content.ts, fully responsive. Commit.
```

---

## PHASE 1 — The 3D scene foundation
**Goal: a live R3F canvas behind the hero — starfield, fog, depth. Static camera for now.**

```
Phase 1. Add the 3D scene as a fixed full-viewport React Three Fiber canvas behind all the HTML content (HTML scrolls over it).

1. Create a <Scene/> component mounted in a fixed, z-0, pointer-events-none canvas. HTML content sits at z-10 and scrolls normally on top.
2. Build a procedural night-sea / starfield atmosphere per the spec (section 6): a Points starfield (2000-3000 points) with subtle drift and mouse parallax, scene fog for depth, a dark gradient background that adapts to the current theme (deep blue-black in dark mode, soft dawn tones in light mode).
3. Add a single subtle focal object the camera will later track — e.g. a small emissive "north star" point or a low-poly floating shape near the horizon. Keep it tasteful.
4. Make the scene theme-aware: it should recolor when the user toggles light/dark.
5. Performance: cap pixel ratio at 2, reduce particle count on small screens, and if prefers-reduced-motion is set, render the scene static (no drift).

Acceptance: canvas renders behind content, holds 60fps, recolors with theme, looks atmospheric. The placeholder HTML from Phase 0 still scrolls normally on top. Commit.
```

---

## PHASE 2 — Lenis + GSAP scroll-driven camera
**Goal: scroll moves the camera through "shots". The core wow-moment.**

```
Phase 2. Wire smooth scroll and scroll-driven camera movement.

1. Add Lenis for smooth scrolling and connect its scroll value to GSAP ScrollTrigger (lenis.on('scroll', ScrollTrigger.update) + gsap ticker raf loop).
2. Create ONE master GSAP timeline scrubbed by overall scroll progress.
3. Define 5-6 camera "shots" (position + lookAt targets) keyframed along the timeline — one per chapter from content.ts. Use custom eases so transitions feel like slow cinematic dollies, not cuts. Drive the R3F camera from these animated values (lerp the camera each frame toward the GSAP-driven target).
4. Keep the camera path inside the scene built in Phase 1 — fly past the north star, drift across the sea, etc.
5. prefers-reduced-motion: skip the camera animation entirely, keep camera static.

Acceptance: scrolling the page smoothly moves the camera through distinct framed shots; it feels intentional and cinematic; no jank. Commit.
```

---

## PHASE 3 — Chapter panels synced to scroll · SHIP CHECKPOINT
**Goal: biography chapters fade in/out in sync with camera shots. After this, DEPLOY.**

```
Phase 3. Sync the biography content to the scroll/camera.

1. For each chapter in content.ts, create a pinned/scroll-triggered HTML panel that fades and slides in while its matching camera shot is active, then fades out as the next begins. Use GSAP ScrollTrigger tied to the same scroll progress as the camera.
2. Chapter II ("The tools"): animate the skills from content.ts as bars or instrument-panel lights that fill when the section enters.
3. Chapter III: surface the projects grid (or a horizontal scroll of project cards) with hover micro-interactions.
4. Add the About section (tea-garden photo + intro) early in the flow, and the Contact CTA ("Let's build something together" + email + socials) as the strong final beat.
5. Add a slim scroll-progress indicator and chapter markers/dots for navigation.
6. Polish responsive behaviour: on mobile, simplify to a clean vertical scroll with fade-ins (camera animation can be minimal) — content must be fully readable.

Acceptance: the full biography reads as a cinematic scroll story, works on mobile, both themes polished, contact CTA prominent. THIS IS DEPLOYABLE. Deploy to Vercel now and get the live URL before doing anything else. Commit + deploy.
```

> 🚩 STOP HERE and put it live. Share the URL. Get it in front of one potential client. Phases 4–5 happen on the already-live site.

---

## PHASE 4 — Polish & micro-interactions
**Goal: the awwwards-tier details. Only after Phase 3 is live.**

```
Phase 4. Add the finishing polish (site is already deployed — these are enhancements).

1. Add @react-three/postprocessing: subtle vignette + light chromatic aberration + bloom on the north star. Make it perf-aware and auto-disable on low-end devices.
2. Animated text reveals on chapter titles (split-text style line-by-line via GSAP).
3. Custom cursor glow / hover states on interactive elements.
4. A polished intro/loading sequence: brief logo animation that transitions seamlessly into the scene (avoid a jarring "loading 3D" flash — fade from a static frame into the live canvas).
5. Sound toggle (optional): ambient sea/wind loop, off by default, user-enabled.
6. Page transition smoothing and scroll-snap to chapters (optional, test feel).

Acceptance: feels premium, still 60fps, postprocessing degrades gracefully. Commit + redeploy.
```

---

## PHASE 5 — Real content, SEO, performance, handoff
**Goal: replace demo data, lock down perf, make it findable.**

```
Phase 5. Production hardening.

1. Walk me through replacing the demo projects in content.ts with real ones (keep the same shape). Add a short comment block at the top of content.ts explaining exactly how to add/edit a project, chapter, or skill.
2. SEO: proper metadata, OpenGraph image (generate one using the logo + name), sitemap, robots.txt, semantic headings, alt text on both photos.
3. Performance pass: Lighthouse audit, lazy-load the 3D canvas (don't block first paint), compress the two portrait photos via next/image, code-split GSAP/Three, target 90+ performance on desktop.
4. Accessibility pass: keyboard navigation through all interactive elements, visible focus states, reduced-motion fully respected, color contrast checked in both themes.
5. Analytics (optional): add a privacy-friendly analytics snippet so Numan can see if clients visit.

Acceptance: real content in, Lighthouse 90+/accessible, ready to send to clients. Final commit + deploy.
```

---

## How to work with Claude Code through this

- One phase per session. Test before moving on.
- If a phase output is too big or breaks, tell Claude Code: "this errored: [paste error]" — don't restart from scratch.
- Keep `content.ts` sacred — all content edits go there.
- The ship checkpoint after Phase 3 is the most important line in this document. Honor it.
