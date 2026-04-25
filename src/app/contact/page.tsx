import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send a message to Perdurable Rotations.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-20">
      <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl">
        Contact us
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--color-foreground-muted)]">
        Send us a note and we&apos;ll get back to you.
      </p>

      <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_1px_2px_rgb(0_0_0_/_0.06)] sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}

