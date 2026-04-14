"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LogoRibbon() {
  const pathname = usePathname();
  if (pathname === "/") {
    return null;
  }

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] py-6 sm:py-8"
      aria-label="Site logo"
    >
      <div className="mx-auto flex max-w-5xl justify-center px-4 sm:px-6">
        <Link
          href="/"
          className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
          aria-label="Perdurable Rotations home"
        >
          <Image
            src="/logo.svg"
            alt="Perdurable Rotations Logo"
            width={120}
            height={120}
            className="h-24 w-24 sm:h-32 sm:w-32"
            priority
          />
        </Link>
      </div>
    </section>
  );
}
