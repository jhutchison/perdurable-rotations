import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send a message to Perdurable Rotations.",
};

export default function ContactPage() {
  return (
    <div className="relative px-6 py-16 sm:py-20">
      <Image
        src="/popping_bobby.jpeg"
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

      <div className="mx-auto w-full max-w-2xl">
      <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl">
        Contact us
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--color-foreground-muted)]">
        Have some vinyl to sell? Something specific you want us to track down?
        Pitch us a new location for an outreach box, tell us what you&apos;re
        looking for, or just say hi.
      </p>

      <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_1px_2px_rgb(0_0_0_/_0.06)] sm:p-8">
        <ContactForm />
      </div>
      </div>
    </div>
  );
}

