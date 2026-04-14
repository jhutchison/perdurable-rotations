import type { Metadata } from "next";
import Image from "next/image";

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
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-normal tracking-tight text-[var(--color-foreground)] sm:text-4xl">
          Perdurable Rotations
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-foreground-muted)] sm:text-lg">
          Something new is spinning up. Check back soon.
        </p>
        <p className="mt-10 text-sm text-[var(--color-foreground-muted)]">
          Full site <span className="text-[var(--color-foreground)]">coming soon</span>
        </p>
      </div>
    </div>
  );
}
