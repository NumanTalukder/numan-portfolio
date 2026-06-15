import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="#top"
          aria-label="Back to top"
          className="shrink-0 rounded-sm"
        >
          <Logo />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="mr-1 hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
