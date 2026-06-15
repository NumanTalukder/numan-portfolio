import { Nav } from "@/components/Nav";
import { Media } from "@/components/Media";
import { SceneMount } from "@/components/scene/SceneMount";
import { ScrollController } from "@/components/ScrollController";
import { profile, projects, skills } from "@/data/content";

export default function Home() {
  return (
    <div id="top">
      {/* Smooth scroll + scroll-driven camera (renders nothing). */}
      <ScrollController />
      {/* Fixed full-viewport 3D atmosphere; HTML scrolls over it. */}
      <SceneMount />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Work />
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
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-16 sm:px-8">
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
        <p className="mt-6 max-w-xl text-lg text-muted">{profile.tagline}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#work"
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
    <Section id="about" eyebrow="About" title="A builder from Dhaka">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border shadow-sm">
          <Media
            src={profile.photoTea}
            alt={`${profile.name} at a tea garden in Bangladesh`}
            label="Tea garden portrait"
            className="h-full w-full"
          />
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            I&apos;m {profile.name}, a software engineer based in{" "}
            {profile.location}. I build web products end to end — from the data
            model up to the last pixel — and I care most about the kind of
            software that quietly works every single day.
          </p>
          <p>
            Outside the editor I&apos;m happiest taking something apart to
            understand it, and faith gives my days their steady structure. Both
            keep me grounded in the same thing: doing the work carefully and
            doing it well.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- Skills -- */
function Skills() {
  return (
    <Section id="skills" eyebrow="The tools" title="What I work with">
      <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {skills.map((skill) => (
          <li key={skill.name}>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="font-medium">{skill.name}</span>
              <span className="font-mono text-xs text-muted">
                {skill.level}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ----------------------------------------------------------------- Work -- */
function Work() {
  return (
    <Section id="work" eyebrow="Selected work" title="Things I’ve built">
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
                className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold transition-colors group-hover:text-brand">
                {project.title}
              </h3>
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
    </Section>
  );
}

/* -------------------------------------------------------------- Contact -- */
function Contact() {
  const socials = Object.entries(profile.socials).filter(
    ([, url]) => url && url !== "#"
  );

  return (
    <Section id="contact" eyebrow="Contact">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
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
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- Footer -- */
function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="font-mono text-xs">Built with Next.js · Tailwind</p>
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

/* -------------------------------------------------------- Section shell -- */
function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-content">
        <p className="font-mono text-xs uppercase tracking-widest2 text-brand">
          {eyebrow}
        </p>
        {title && (
          <h2 className="mb-12 mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
