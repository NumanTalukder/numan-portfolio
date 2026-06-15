/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ============================================================================
 * Edit this file to change anything on the site. Never edit components for
 * content — every section renders from the exports below.
 *
 * HOW TO EDIT
 * - Text / dates / links: change the strings in place.
 * - Add a project / job / school: copy an existing object in the array and
 *   tweak its fields (keep the same shape; `id` must be unique).
 * - Images: drop the real file in /public/images at the referenced path. Until
 *   then a branded placeholder shows automatically.
 * - `featured: true` marks a project for the showcase.
 *
 * Items marked "DEMO" are placeholders — replace with real values when ready.
 * ============================================================================
 */

export const profile = {
  name: "Numan",
  fullName: "Numan Talukder",
  role: "Software Engineer",
  // A second line that hints at the founder/leadership side without crowding
  // the headline "Software Engineer".
  roleSub: "Engineer · Builder · Founder",
  tagline: "Engineer by training. Builder by obsession.",
  location: "Dhaka, Bangladesh",
  email: "numantalukder1001@gmail.com",
  bornOn: "February 16, 1997",
  bornIn: "Chandpur, Bangladesh",
  // The places the journey has passed through, in order.
  journey: ["Chandpur", "Sylhet", "Dhaka"],
  // Countries visited so far (more to come, inshaAllah).
  travels: ["India", "Saudi Arabia"],
  hobbies: [
    "Writing code",
    "Listening to the Qur'an",
    "Traveling",
    "Exploring new technology",
  ],
  socials: {
    github: "#",
    linkedin: "#",
    facebook: "#",
    x: "#",
  },
  photoForest: "/images/numan-forest.jpg", // uploaded photo 1
  photoTea: "/images/numan-tea.jpg", // uploaded photo 2
};

/* -------------------------------------------------------------- chapters -- */
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
    body: "I was born in Chandpur in 1997 and grew up between the rivers of Sylhet — the kind of place that teaches you to pay attention. My schooling started at a madrasah, where discipline and curiosity were treated as the same muscle. Somewhere in there I met my first computer, and the question that still drives me: how does this actually work?",
  },
  {
    id: "arsenal",
    marker: "Chapter II",
    title: "The tools",
    body: "Science carried me from MC College in Sylhet to a BSc in Computer Science at North South University. Along the way I assembled a kit I trust — React and Next.js on the surface, TypeScript to keep it honest, and databases I can reason about under pressure. Tools matter less than fluency with them, so I keep mine sharp and let each problem choose the stack.",
  },
  {
    id: "ventures",
    marker: "Chapter III",
    title: "What I've built",
    body: "I started as a junior web developer and climbed fast — from IT Executive to the leadership table at Greentouch, then into founding and directing my own companies. Today I run Codextra Technology and help steer Swift Booking and Greentouch Builders. The work I'm proudest of is the kind that quietly runs every day without anyone thinking about it.",
  },
  {
    id: "creed",
    marker: "Chapter IV",
    title: "How I work",
    body: "I move deliberately: understand the problem, cut it to its essentials, then build something simple enough to maintain for years. Faith gives my days their structure and a steady measure of patience. I'd rather ship a small thing that works than a grand thing that doesn't — clear thinking and clear code are the same discipline to me.",
  },
  {
    id: "horizon",
    marker: "Chapter V",
    title: "Where it's going",
    body: "I'm aiming for harder problems and longer-lived work, and for teams who care about the craft as much as the outcome. I want to keep building companies, keep adapting to whatever technology comes next, and keep traveling to see more of the world — India and Saudi Arabia so far, more to come, inshaAllah. The horizon keeps moving, and that's exactly why I keep sailing toward it.",
  },
];

/* ---------------------------------------------------------------- skills -- */
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

/* ------------------------------------------------------------ experience -- */
export type Role = {
  title: string;
  /** e.g. "2023 – Present" */
  period: string;
};

export type Experience = {
  id: string;
  company: string;
  /** Roles held at this company, newest first. A single-role job has one entry;
   *  a progression (a climb up the ladder) lists several. */
  roles: Role[];
  /** Whether this is a current position (highlighted in the UI). */
  current?: boolean;
  blurb?: string;
};

export const experience: Experience[] = [
  {
    id: "codextra",
    company: "Codextra Technology",
    current: true,
    roles: [{ title: "Chief Executive Officer", period: "2023 – Present" }],
    blurb:
      "Founder and CEO of a software studio building web products and client platforms end to end.",
  },
  {
    id: "swift-booking",
    company: "Swift Booking",
    current: true,
    roles: [{ title: "Director", period: "2023 – Present" }],
    blurb:
      "Co-leading an online booking platform for tickets, stays and travel.",
  },
  {
    id: "greentouch-builders",
    company: "Greentouch Builders Ltd.",
    current: true,
    roles: [{ title: "Director", period: "2024 – Present" }],
    blurb: "Director overseeing technology and operations for the construction arm.",
  },
  {
    id: "greentouch-corp",
    company: "Greentouch Corporation Ltd.",
    roles: [
      { title: "Assistant Director", period: "2024 – 2026" },
      { title: "General Manager", period: "2023 – 2024" },
      { title: "Assistant GM", period: "2021 – 2023" },
      { title: "IT Executive", period: "2019 – 2020" },
    ],
    blurb:
      "Climbed from IT Executive to the leadership team over six years, building and running the systems behind a growing building-materials business.",
  },
  {
    id: "tech-soul",
    company: "Tech Soul",
    roles: [{ title: "Junior Web Developer", period: "Jan 2023 – Jun 2023" }],
    blurb: "Where the professional coding journey began.",
  },
];

/* ------------------------------------------------------------- education -- */
export type Education = {
  id: string;
  institution: string;
  credential: string;
  field?: string;
  year: string;
};

export const education: Education[] = [
  {
    id: "nsu",
    institution: "North South University",
    credential: "BSc in Computer Science & Engineering",
    year: "2021",
  },
  {
    id: "mc-college",
    institution: "MC College, Sylhet",
    credential: "Higher Secondary Certificate (HSC)",
    field: "Science",
    year: "2015",
  },
  {
    id: "madrasah",
    institution: "Shahjalal Jameya Islamia Kamil Madrasah",
    credential: "Secondary School Certificate (SSC)",
    field: "Science",
    year: "2013",
  },
];

/* ----------------------------------------------------------------- stats -- */
// Headline numbers for an "at a glance" strip. Edit the values freely.
export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "7+", label: "Years in tech" },
  { value: "4", label: "Companies led & founded" },
  { value: "12+", label: "Products shipped" },
  { value: "2", label: "Countries explored" },
];

/* -------------------------------------------------------------- services -- */
// What Numan offers clients — drives the "how we can work together" angle.
export type Service = { title: string; description: string };

export const services: Service[] = [
  {
    title: "Web Application Development",
    description:
      "Full-stack web apps built end to end with Next.js, TypeScript and a database layer that scales.",
  },
  {
    title: "E-commerce & Platforms",
    description:
      "Storefronts, marketplaces and booking platforms with payments, inventory and real-time data.",
  },
  {
    title: "Internal Tools & ERP",
    description:
      "Operations, ledger and admin systems that quietly run a business every day.",
  },
  {
    title: "Technical Leadership",
    description:
      "Architecture, team direction and product strategy — from first commit to a shipping company.",
  },
];

/* ----------------------------------------------------------------- projects -- */
export type Project = {
  id: number;
  title: string;
  category: string;
  year: string;
  blurb: string;
  stack: string[];
  link: string;
  image: string;
  /** Surface this one in the showcase. */
  featured?: boolean;
};

// DEMO projects — replace these with real ones later (keep the same shape).
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
    featured: true,
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
    featured: true,
  },
  {
    id: 3,
    title: "Swift Booking",
    category: "Travel Tech",
    year: "2024",
    blurb: "Online booking platform for tickets and stays with live availability.",
    stack: ["Next.js", "Node", "PostgreSQL"],
    link: "#",
    image: "/images/proj-5.jpg",
    featured: true,
  },
  {
    id: 4,
    title: "Founder Tale",
    category: "Editorial",
    year: "2024",
    blurb: "Interview blog telling honest stories of Bangladeshi founders.",
    stack: ["Next.js", "MDX"],
    link: "#",
    image: "/images/proj-3.jpg",
  },
  {
    id: 5,
    title: "Coco & Co.",
    category: "Commerce",
    year: "2024",
    blurb: "Coconut wholesale distribution with a vendor-first model.",
    stack: ["React", "Node"],
    link: "#",
    image: "/images/proj-4.jpg",
  },
  {
    id: 6,
    title: "Codextra Suite",
    category: "SaaS",
    year: "2025",
    blurb: "Internal product suite and client dashboards for a software studio.",
    stack: ["Next.js", "TypeScript", "MongoDB"],
    link: "#",
    image: "/images/proj-6.jpg",
  },
];

/* ------------------------------------------------------------ testimonials -- */
export type Testimonial = {
  id: number;
  quote: string;
  author: string;
  title: string;
};

// DEMO testimonials — placeholder copy. Swap in real client quotes when ready.
export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Numan turned a messy operation into software we actually rely on every day. Calm, fast, and he sweats the details that matter.",
    author: "Demo Client",
    title: "Operations Lead, Retail",
  },
  {
    id: 2,
    quote:
      "He thinks like an owner, not a contractor. We got a product and a partner who understood the business behind it.",
    author: "Demo Client",
    title: "Founder, Startup",
  },
  {
    id: 3,
    quote:
      "Shipped exactly what we needed, on time, and explained every decision in plain language. Would build with him again.",
    author: "Demo Client",
    title: "Director, Services",
  },
];
