import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-20 max-w-content items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="#top" aria-label="Back to top" className="shrink-0 rounded-sm">
          <Logo />
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
