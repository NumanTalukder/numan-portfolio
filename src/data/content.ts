/**
 * SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT.
 * Edit this file to change projects, chapters, skills, or profile details.
 * Never edit components for content changes — everything renders from here.
 *
 * Image paths point into /public. Drop the real files at those paths and they
 * appear automatically; until then a branded placeholder is shown.
 */

export const profile = {
  name: "Numan",
  role: "Software Engineer",
  tagline: "Engineer by training. Builder by obsession.",
  location: "Dhaka, Bangladesh",
  email: "numantalukder1001@gmail.com",
  socials: {
    github: "#",
    linkedin: "#",
    facebook: "#",
    x: "#",
  },
  photoForest: "/images/numan-forest.jpg", // uploaded photo 1
  photoTea: "/images/numan-tea.jpg", // uploaded photo 2
} as const;

export type Chapter = {
  id: string;
  marker: string;
  title: string;
  body: string;
};

export const chapters: Chapter[] = [
  {
    id: "origin",
    marker: "Chapter I",
    title: "Where it began",
    body: "I started with a single question that wouldn't leave me alone: how does any of this actually work? Taking things apart and rebuilding them became a habit long before it was a job. Curiosity was the first tool I ever owned, and it still drives every line I write.",
  },
  {
    id: "arsenal",
    marker: "Chapter II",
    title: "The tools",
    body: "Over the years I've gathered a kit I trust — React and Next.js for the surface, TypeScript to keep it honest, and a database layer I can reason about under pressure. Tools matter less than fluency with them, so I keep mine sharp and let the problem choose the stack.",
  },
  {
    id: "ventures",
    marker: "Chapter III",
    title: "What I've built",
    body: "I've shipped commerce platforms, internal systems, and editorial products — each one a real business with real stakes. The work I'm proudest of is the kind that quietly runs every day without anyone thinking about it. Shipping something people depend on is the part that never gets old.",
  },
  {
    id: "creed",
    marker: "Chapter IV",
    title: "How I work",
    body: "I move deliberately: understand the problem, cut it down to its essentials, then build something simple enough to maintain. I'd rather ship a small thing that works than a grand thing that doesn't. Clear thinking shows up as clear code, and I treat both as the same discipline.",
  },
  {
    id: "horizon",
    marker: "Chapter V",
    title: "Where it's going",
    body: "I'm aiming for harder problems and longer-lived work — systems worth maintaining for years, not weeks. I want to keep collaborating with people who care about the craft as much as the outcome. The destination keeps moving, and that's exactly why I keep building toward it.",
  },
];

export type Skill = {
  name: string;
  level: number;
};

export const skills: Skill[] = [
  { name: "Next.js", level: 90 },
  { name: "TypeScript", level: 82 },
  { name: "MongoDB", level: 80 },
  { name: "TailwindCSS", level: 88 },
  { name: "Python", level: 60 },
  { name: "Figma", level: 75 },
];

export type Project = {
  id: number;
  title: string;
  category: string;
  year: string;
  blurb: string;
  stack: string[];
  link: string;
  image: string;
};

// DEMO projects — replace these later (keep the same shape).
export const projects: Project[] = [
  {
    id: 1,
    title: "Abir Apparel",
    category: "E-commerce",
    year: "2025",
    blurb: "Wholesale children's clothing platform with per-pack ordering.",
    stack: ["Next.js", "MongoDB", "Stripe"],
    link: "#",
    image: "/images/proj-1.jpg",
  },
  {
    id: 2,
    title: "Greentouch ERP",
    category: "Internal Tool",
    year: "2025",
    blurb: "Operations + ledger system for a building-materials business.",
    stack: ["Next.js", "PostgreSQL"],
    link: "#",
    image: "/images/proj-2.jpg",
  },
  {
    id: 3,
    title: "Founder Tale",
    category: "Editorial",
    year: "2024",
    blurb: "Interview blog telling honest stories of Bangladeshi founders.",
    stack: ["Next.js", "MDX"],
    link: "#",
    image: "/images/proj-3.jpg",
  },
  {
    id: 4,
    title: "Coco & Co.",
    category: "Commerce",
    year: "2024",
    blurb: "Coconut wholesale distribution with a vendor-first model.",
    stack: ["React", "Node"],
    link: "#",
    image: "/images/proj-4.jpg",
  },
];
