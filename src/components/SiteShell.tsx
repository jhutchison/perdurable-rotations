import Link from "next/link";
import { LogoRibbon } from "@/components/LogoRibbon";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-[var(--color-foreground)]"
          >
            Perdurable Rotations
          </Link>
          <nav aria-label="Primary">
            <ul className="flex flex-wrap gap-6 text-sm font-medium">
              <li>
                <Link
                  href="/"
                  className="text-[var(--color-foreground-muted)] underline-offset-4 hover:text-[var(--color-foreground)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
                >
                  Home
                </Link>
              </li>
              <li>
                {/* <Link
                  href="/catalog"
                  className="text-[var(--color-foreground-muted)] underline-offset-4 hover:text-[var(--color-foreground)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
                >
                  Catalog
                </Link> */}
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main
        id="main-content"
        className="flex-1 outline-none"
        tabIndex={-1}
      >
        <LogoRibbon />
        {children}
      </main>
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl text-sm text-[var(--color-foreground-muted)]">
          <p>Used vinyl — more listings coming soon.</p>
        </div>
      </footer>
    </>
  );
}
