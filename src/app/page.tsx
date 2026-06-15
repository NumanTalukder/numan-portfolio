import { Nav } from "@/components/Nav";
import { Media } from "@/components/Media";
import { SceneMount } from "@/components/scene/SceneMount";
import { ScrollController } from "@/components/ScrollController";
import { ScrollHud } from "@/components/ScrollHud";
import { Reveal } from "@/components/anim/Reveal";
import { ChapterHeading } from "@/components/sections/ChapterHeading";
import { SkillBars } from "@/components/sections/SkillBars";
import {
  profile,
  chapters,
  skills,
  experience,
  education,
  stats,
  services,
  projects,
  testimonials,
  type Chapter,
} from "@/data/content";

// Chapter lookup so each section can pull its own copy by id.
const ch = Object.fromEntries(chapters.map((c) => [c.id, c])) as Record<
  string,
  Chapter
>;

export default function Home() {
  return (
    <div id="top">
      {/* Smooth scroll + scroll-driven camera (renders nothing). */}
      <ScrollController />
      {/* Fixed full-viewport 3D atmosphere; HTML scrolls over it. */}
      <SceneMount />
      {/* Progress bar + chapter dots. */}
      <ScrollHud chapters={chapters} />

      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <About />
          <StatsBand />

          {/* I — roots */}
          <ChapterSection chapter={ch.origin} />

          {/* II — the tools: skills + education */}
          <ChapterSection chapter={ch.arsenal}>
            <Block label="Toolkit">
              <SkillBars skills={skills} />
            </Block>
            <Block label="Education" className="mt-16">
              <EducationList />
            </Block>
          </ChapterSection>

          {/* III — what I've built: experience + projects */}
          <ChapterSection chapter={ch.ventures}>
            <Block label="The climb">
              <ExperienceList />
            </Block>
            <Block label="Selected work" className="mt-16">
              <ProjectsShowcase />
            </Block>
          </ChapterSection>

          {/* IV — how I work: services */}
          <ChapterSection chapter={ch.creed}>
            <Block label="What I can build">
              <ServicesGrid />
            </Block>
          </ChapterSection>

          {/* V — where it's going */}
          <ChapterSection chapter={ch.horizon} />

          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Hero -- */
function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-5 pt-16 sm:px-8">
      <div className="mx-auto w-full max-w-content">
        <p className="font-mono text-xs uppercase tracking-widest2 text-brand">
          {profile.location}
        </p>
        <h1 className="mt-5 font-display text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-8xl">
          {profile.name}
        </h1>
        <p className="mt-4 font-display text-2xl font-bold text-muted sm:text-4xl">
          {profile.role}
        </p>
        <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-muted">
          {profile.roleSub}
        </p>
        <p className="mt-6 max-w-xl text-lg text-muted">{profile.tagline}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#ventures"
            className="rounded-full bg-brand px-6 py-3 font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            View work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-6 py-3 font-medium transition-colors hover:border-brand hover:text-brand"
          >
            Get in touch
          </a>
        </div>
      </div>

      <span className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest2 text-muted">
        scroll
      </span>
    </section>
  );
}

/* ---------------------------------------------------------------- About -- */
function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 px-5 py-28 sm:px-8 sm:py-36"
    >
      <div className="mx-auto max-w-content">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest2 text-brand">
            About
          </p>
        </Reveal>
        <div className="mt-8 grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border shadow-lg">
              <Media
                src={profile.photoTea}
                alt={`${profile.fullName} at a tea garden in Bangladesh`}
                label="Tea garden portrait"
                className="h-full w-full"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
              A builder from Dhaka
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m {profile.name} — a software engineer and founder based
                in {profile.location}. I build web products end to end, from the
                data model to the last pixel, and I care most about software
                that quietly works every single day.
              </p>
              <p>
                My path runs from a madrasah in Sylhet to a Computer Science
                degree at NSU, and from a junior developer role to leading and
                founding companies. Faith gives my days their structure;
                curiosity gives them their direction.
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-5 text-sm">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                  Born
                </dt>
                <dd className="mt-1">
                  {profile.bornOn} · {profile.bornIn}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                  Journey
                </dt>
                <dd className="mt-1">{profile.journey.join(" → ")}</dd>
              </div>
            </dl>
            <ul className="mt-6 flex flex-wrap gap-2">
              {profile.hobbies.map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted"
                >
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Stats band -- */
function StatsBand() {
  return (
    <section className="relative px-5 py-12 sm:px-8">
      <Reveal className="mx-auto max-w-content">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-bg-elevated/80 p-6 text-center backdrop-blur-md"
            >
              <div className="font-display text-4xl font-extrabold text-brand sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------- Chapter section -- */
function ChapterSection({
  chapter,
  children,
}: {
  chapter: Chapter;
  children?: React.ReactNode;
}) {
  return (
    <section
      id={chapter.id}
      data-chapter-section
      className="relative scroll-mt-24 px-5 sm:px-8"
    >
      <div className="mx-auto max-w-content">
        <div className="flex min-h-[80vh] items-center">
          <ChapterHeading chapter={chapter} />
        </div>
        {children && <div className="pb-28 sm:pb-36">{children}</div>}
      </div>
    </section>
  );
}

/** A labelled content block inside a chapter; fades in on scroll. */
function Block({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <p className="mb-6 font-mono text-xs uppercase tracking-widest2 text-brand">
        {label}
      </p>
      {children}
    </Reveal>
  );
}

/* ------------------------------------------------------------ Experience -- */
function ExperienceList() {
  return (
    <div className="space-y-6">
      {experience.map((job) => (
        <div
          key={job.id}
          className="rounded-2xl border border-border/60 bg-bg-elevated/70 p-6 backdrop-blur-md sm:p-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h4 className="font-display text-xl font-bold">{job.company}</h4>
            {job.current && (
              <span className="rounded-full bg-brand/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-brand">
                Current
              </span>
            )}
          </div>
          {job.blurb && (
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {job.blurb}
            </p>
          )}
          <ul className="mt-4 space-y-2">
            {job.roles.map((r, i) => (
              <li
                key={`${r.title}-${i}`}
                className="flex items-baseline justify-between gap-4 border-t border-border/50 pt-2 text-sm first:border-0 first:pt-0"
              >
                <span className="font-medium">{r.title}</span>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {r.period}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- Education -- */
function EducationList() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {education.map((e) => (
        <div
          key={e.id}
          className="rounded-2xl border border-border/60 bg-bg-elevated/70 p-5 backdrop-blur-md"
        >
          <p className="font-mono text-xs text-brand">{e.year}</p>
          <h4 className="mt-2 font-semibold leading-snug">{e.credential}</h4>
          {e.field && <p className="text-sm text-muted">{e.field}</p>}
          <p className="mt-3 text-sm text-muted">{e.institution}</p>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------- Projects grid -- */
function ProjectsShowcase() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <a
          key={project.id}
          href={project.link}
          className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-colors hover:border-brand"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Media
              src={project.image}
              alt={`${project.title} — ${project.category}`}
              label={project.title}
              className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {project.featured && (
              <span className="absolute left-3 top-3 rounded-full bg-bg/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-brand backdrop-blur">
                Featured
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            <h4 className="mt-2 font-display text-xl font-bold transition-colors group-hover:text-brand">
              {project.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {project.blurb}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </a>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------- Services -- */
function ServicesGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {services.map((s) => (
        <div
          key={s.title}
          className="rounded-2xl border border-border/60 bg-bg-elevated/70 p-6 backdrop-blur-md"
        >
          <h4 className="font-display text-lg font-bold">{s.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {s.description}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------- Testimonials -- */
function Testimonials() {
  return (
    <section className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <p className="mb-10 text-center font-mono text-xs uppercase tracking-widest2 text-brand">
            Kind words
          </p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-border/60 bg-bg-elevated/70 p-6 backdrop-blur-md">
                <blockquote className="flex-1 text-sm leading-relaxed">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5">
                  <div className="font-medium">{t.author}</div>
                  <div className="text-xs text-muted">{t.title}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Contact -- */
function Contact() {
  const socials = Object.entries(profile.socials).filter(
    ([, url]) => url && url !== "#"
  );

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 px-5 py-32 sm:px-8 sm:py-44"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest2 text-brand">
          Contact
        </p>
        <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
          Let&apos;s build something together.
        </h2>
        <p className="mt-5 text-lg text-muted">
          Have a project in mind, or just want to talk shop? I&apos;m always
          open to a good problem.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block rounded-full bg-brand px-8 py-4 text-lg font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          {profile.email}
        </a>

        {socials.length > 0 && (
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {socials.map(([name, url]) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-brand hover:text-brand"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </section>
  );
}

/* --------------------------------------------------------------- Footer -- */
function Footer() {
  return (
    <footer className="relative border-t border-border/60">
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
  );
}
