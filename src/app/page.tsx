import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Perdurable Rotations",
  description:
    "Perdurable Rotations — used vinyl preservation and outreach.",
};

export default function Home() {
  return (
    <div className="relative flex min-h-[calc(100dvh-12rem)] flex-col items-center justify-center px-6 py-16 sm:min-h-[calc(100dvh-10rem)] sm:py-20">
      <Image
        src="/record_spines.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(247_244_239_/_0.78),rgb(247_244_239_/_0.64))] dark:bg-[linear-gradient(to_bottom,rgb(12_10_9_/_0.62),rgb(12_10_9_/_0.76))]"
      />
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
        <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-foreground-muted)] sm:text-lg">
         Doing our part to preserve the magic of analogue in an overly digital world.
         We hunt down and preserve records, and make them available for browsing and purchase at select locations in SE Michigan.
         We are happy to look for specific artists or records on request (specializing in Detroit-based music) and will ship if needed.
         We are actively looking for new locations to partner with, so if you&apos;re interested in hosting an outreach box, please get in touch.
         We are also always on the hunt for new records.   
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
