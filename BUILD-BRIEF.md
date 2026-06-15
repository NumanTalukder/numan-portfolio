# Numan — Portfolio & Biography Site · Build Brief

> Paste this whole file into Claude Code first (e.g. save as `BUILD-BRIEF.md` in the repo root and tell Claude Code "read BUILD-BRIEF.md, this is the spec"). Then run the phased prompts from `CLAUDE-CODE-PROMPTS.md` one at a time.

---

## 1. What this is

A personal **biography + portfolio** site for Numan, a software engineer in Dhaka, Bangladesh. Goal: impress potential clients and communicate personality. Cinematic, scroll-driven, immersive — inspired by awwwards-tier sites (Persepolis Reimagined, Igloo Inc, Corn Revolution).

The narrative metaphor is a **night voyage**: a journey across a dark sea/sky toward a destination. Scroll moves the journey forward. Each "chapter" of the biography is a stop along the way. This metaphor should be felt, not over-literal — atmosphere over cartoon.

Headline / role: **Software Engineer.**

## 2. Brand

- **Primary color:** sky blue `#0EA5E9`
- **Light accent:** `#38BDF8`
- **Ink (dark text):** `#0F172A`
- **Dark bg:** `#0B1120` / `#04060d`
- **Light bg:** `#F8FAFC` / parchment-warm `#F5F0E8` optional
- **Logo:** provided in `/public/brand/` — `numan-logo.svg` (light), `numan-logo-dark.svg` (dark wordmark), `numan-mark.svg` (icon/favicon). The mark is an "N" rising into a north-star needle.
- **Fonts:** Display = Syne (700/800). Body = Space Grotesk or Inter. Mono accents = Space Mono. Load via Google Fonts or self-host.
- **Theme:** BOTH light and dark, user-toggleable, respects `prefers-color-scheme` on first load, persists choice (cookie or localStorage — note: localStorage is fine in a real deployed Next.js app, just not inside claude.ai artifacts).

## 3. Tech stack (recommended — fits Numan's React/TS skills)

- **Framework:** Next.js 15 (App Router) + TypeScript
- **3D:** React Three Fiber (`@react-three/fiber`) + `@react-three/drei`
- **Animation:** GSAP + ScrollTrigger
- **Smooth scroll:** Lenis (`@studio-freight/lenis` / `lenis`)
- **Styling:** TailwindCSS
- **Deploy:** Vercel or Netlify

Rationale: R3F lets Numan write the 3D scene as React components (familiar), GSAP ScrollTrigger drives the scroll→camera animation, Lenis gives the buttery momentum that sells the "expensive" feel.

## 4. Content model (MUST be editable in one place)

All site content lives in a single typed data file: `src/data/content.ts`. Numan edits this file to change projects, chapters, links — never touches components for content changes. Shape:

```ts
export const profile = {
  name: "Numan",
  role: "Software Engineer",
  tagline: "Engineer by training. Builder by obsession.",
  location: "Dhaka, Bangladesh",
  email: "REPLACE_ME@example.com",
  socials: { github: "#", linkedin: "#", facebook: "#", x: "#" },
  photoForest: "/images/numan-forest.jpg",   // uploaded photo 1
  photoTea: "/images/numan-tea.jpg",          // uploaded photo 2
};

export const chapters = [
  { id: "origin",     marker: "Chapter I",   title: "Where it began",   body: "..." },
  { id: "arsenal",    marker: "Chapter II",  title: "The tools",        body: "..." },
  { id: "ventures",   marker: "Chapter III", title: "What I've built",  body: "..." },
  { id: "creed",      marker: "Chapter IV",  title: "How I work",       body: "..." },
  { id: "horizon",    marker: "Chapter V",   title: "Where it's going", body: "..." },
];

export const skills = [
  { name: "Next.js", level: 90 },
  { name: "TypeScript", level: 82 },
  { name: "MongoDB", level: 80 },
  { name: "TailwindCSS", level: 88 },
  { name: "Python", level: 60 },
  { name: "Figma", level: 75 },
];

// DEMO projects — Numan replaces these later
export const projects = [
  { id: 1, title: "Abir Apparel", category: "E-commerce", year: "2025",
    blurb: "Wholesale children's clothing platform with per-pack ordering.",
    stack: ["Next.js", "MongoDB", "Stripe"], link: "#", image: "/images/proj-1.jpg" },
  { id: 2, title: "Greentouch ERP", category: "Internal Tool", year: "2025",
    blurb: "Operations + ledger system for a building-materials business.",
    stack: ["Next.js", "PostgreSQL"], link: "#", image: "/images/proj-2.jpg" },
  { id: 3, title: "Founder Tale", category: "Editorial", year: "2024",
    blurb: "Interview blog telling honest stories of Bangladeshi founders.",
    stack: ["Next.js", "MDX"], link: "#", image: "/images/proj-3.jpg" },
  { id: 4, title: "Coco & Co.", category: "Commerce", year: "2024",
    blurb: "Coconut wholesale distribution with a vendor-first model.",
    stack: ["React", "Node"], link: "#", image: "/images/proj-4.jpg" },
];
```

Keep all copy short. These are demo values — real ones come later.

## 5. Page structure (single long scroll)

1. **Hero / Cold open** — dark sea + stars (or light: dawn sea). Logo top-left. Name + "Software Engineer" fade in. Scroll hint. The 3D scene is alive behind the text.
2. **About** — Numan's photo (tea-garden shot), 2–3 sentence personal intro. Dhaka, builder, faith as daily structure (kept tasteful/optional).
3. **Chapters I–V** — scroll-driven story beats; camera moves through the 3D scene as each chapter's text fades in/out. Skills surface in Chapter II as animated bars or instrument-panel lights.
4. **Projects** — grid or horizontal scroll of the demo projects; hover micro-interactions; each card links out.
5. **Contact / CTA** — "Let's build something together" + email + socials. This is the client-conversion moment — make it prominent.
6. **Footer** — copyright, built-with, back-to-top.

## 6. The 3D scene (procedural — no heavy modeling)

Do NOT require Blender models. Build atmosphere procedurally so it stays light and ships fast:
- Particle starfield (Points) with parallax + subtle drift
- A reflective/■ plane or shader-ish gradient sea (can be a simple plane with a custom gradient material or fog horizon)
- Volumetric fog (`fog` in R3F) for depth
- Optional: a low-poly boat or a single floating geometric "north star" object the camera tracks
- Subtle chromatic-aberration / vignette postprocessing (`@react-three/postprocessing`) ONLY if perf allows — make it toggleable

Performance budget: must hold 60fps on a mid-range laptop and degrade gracefully on mobile (reduce particle count, drop postprocessing). Respect `prefers-reduced-motion` — if set, freeze the camera animation and just fade content in.

## 7. Scroll → camera system

- Lenis drives smooth scroll; feed Lenis's scroll value into GSAP ScrollTrigger.
- One master GSAP timeline scrubbed by scroll progress (0→1).
- Camera position/rotation keyframed per chapter ("shots"). Use custom eases for cinematic feel.
- HTML chapter panels are pinned/faded in sync with camera shots.
- Each chapter = one "shot"; transitions between shots should feel like a slow dolly, not a cut.

## 8. Acceptance criteria per phase

After **Phase 3** the site MUST be deployable and genuinely good as a plain scroll portfolio EVEN IF the 3D is just a starfield. That's the ship-it checkpoint. Phases 4–5 are enhancement, done after it's already live.

## 9. Non-negotiables

- Fully responsive (mobile-first fallback: simpler scene, same content)
- Accessible: keyboard nav, focus states, alt text on photos, reduced-motion support
- Fast: lazy-load 3D, code-split, optimize the two portrait photos (next/image)
- Content edited only in `content.ts`
- Light + dark theme both polished
