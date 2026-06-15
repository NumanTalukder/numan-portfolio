import { Media } from "@/components/Media";
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
} from "@/data/content";

/**
 * The full content for a voyage stop, selected by id. Server-rendered (passed
 * as children into the client StopPanel) so all copy stays in the SSR HTML for
 * SEO and works without JS. SkillBars is the only animated (client) piece.
 */
export function StopContent({ id }: { id: string }) {
  switch (id) {
    case "harbor":
      return <Harbor />;
    case "arsenal":
      return (
        <>
          <ChapterBody id="arsenal" />
          <Block label="Toolkit">
            <SkillBars skills={skills} />
          </Block>
          <Block label="Education">
            <EducationList />
          </Block>
        </>
      );
    case "ventures":
      return (
        <>
          <ChapterBody id="ventures" />
          <Block label="The climb">
            <ExperienceList />
          </Block>
          <Block label="Selected work">
            <ProjectsShowcase />
          </Block>
        </>
      );
    case "creed":
      return (
        <>
          <ChapterBody id="creed" />
          <Block label="What I can build">
            <ServicesGrid />
          </Block>
        </>
      );
    case "horizon":
      return (
        <>
          <ChapterBody id="horizon" />
          <Block label="Kind words">
            <TestimonialsList />
          </Block>
        </>
      );
    case "contact":
      return <ContactBlock />;
    default:
      return <ChapterBody id={id} />;
  }
}

/* ----------------------------------------------------------------- shared -- */
function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12">
      <p className="mb-6 font-mono text-xs uppercase tracking-widest2 text-brand">
        {label}
      </p>
      {children}
    </div>
  );
}

function ChapterBody({ id }: { id: string }) {
  const body = chapters.find((c) => c.id === id)?.body;
  if (!body) return null;
  return <p className="text-lg leading-relaxed text-muted sm:text-xl">{body}</p>;
}

/* ----------------------------------------------------------------- harbor -- */
function Harbor() {
  return (
    <div>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border shadow-lg">
          <Media
            src={profile.photoTea}
            alt={`${profile.fullName} at a tea garden in Bangladesh`}
            label="Tea garden portrait"
            className="h-full w-full"
          />
        </div>
        <div>
          <div className="space-y-4 text-lg leading-relaxed text-muted">
            <p>
              I&apos;m {profile.name} — a software engineer and founder based in{" "}
              {profile.location}. I build web products end to end, from the data
              model to the last pixel, and I care most about software that
              quietly works every single day.
            </p>
            <p>
              My path runs from a madrasah in Sylhet to a Computer Science degree
              at NSU, and from a junior developer role to leading and founding
              companies. Faith gives my days their structure; curiosity gives
              them their direction.
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
        </div>
      </div>

      <Block label="Ship's log">
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
      </Block>
    </div>
  );
}

/* ------------------------------------------------------------ experience -- */
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
            <p className="mt-2 text-sm leading-relaxed text-muted">{job.blurb}</p>
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

/* ------------------------------------------------------------- education -- */
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

/* -------------------------------------------------------- projects grid -- */
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

/* -------------------------------------------------------------- services -- */
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

/* ----------------------------------------------------------- testimonials -- */
function TestimonialsList() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {testimonials.map((t) => (
        <figure
          key={t.id}
          className="flex h-full flex-col rounded-2xl border border-border/60 bg-bg-elevated/70 p-6 backdrop-blur-md"
        >
          <blockquote className="flex-1 text-sm leading-relaxed">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-5">
            <div className="font-medium">{t.author}</div>
            <div className="text-xs text-muted">{t.title}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------- contact -- */
function ContactBlock() {
  const socials = Object.entries(profile.socials).filter(
    ([, url]) => url && url !== "#"
  );
  return (
    <div className="text-center">
      <p className="text-lg text-muted">
        Have a project in mind, or just want to talk shop? I&apos;m always open
        to a good problem.
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
  );
}
