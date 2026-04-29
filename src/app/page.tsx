import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coming soon",
  description:
    "Perdurable Rotations — curated used vinyl. Full site and shop experience launching soon.",
};

export default function Home() {
  return (
    <div className="flex min-h-[calc(100dvh-12rem)] flex-col items-center justify-center px-6 py-16 sm:min-h-[calc(100dvh-10rem)] sm:py-20">
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <div
          className="relative isolate"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-1/2 -z-10 h-[min(90vw,24rem)] w-[min(90vw,24rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.12] blur-3xl dark:opacity-[0.18]" />
          <Image
            src="/logo.svg"
            alt="Perdurable Rotations"
            width={2000}
            height={2000}
            priority
            className="h-auto w-[min(78vw,20rem)] drop-shadow-[0_12px_32px_rgb(0_0_0_/_0.08)] dark:drop-shadow-[0_12px_40px_rgb(0_0_0_/_0.45)] sm:w-[min(72vw,22rem)]"
          />
        </div>
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
          Used vinyl
        </p>
     
        <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-foreground-muted)] sm:text-lg">
         Doing our part to preserve the magic of analogue in an overly digital world. Hunting down specific artists or records on request (specializing in Detroit-based music). 
         We also make records available at for browsing and purchase at select locations.
        </p>
      

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-[var(--color-accent-contrast)] shadow-[0_10px_25px_rgb(234_88_12_/_0.15)] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
