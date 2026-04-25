"use client";

import { useId, useMemo, useState } from "react";

type ContactStatus = "idle" | "sending" | "sent" | "error";

type ContactResponse =
  | { ok: true }
  | { ok: false; error: string; retryAfterSeconds?: number };

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState<number | null>(null);

  const isBusy = status === "sending";

  const helpTextId = useMemo(() => `${formId}-help`, [formId]);
  const errorId = useMemo(() => `${formId}-error`, [formId]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isBusy) return;

    setStatus("sending");
    setError(null);
    setCooldownSeconds(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const website = String(formData.get("website") ?? "").trim(); // honeypot

    if (!name || !email || !message) {
      setStatus("error");
      setError("Please fill out your name, email, and message.");
      return;
    }
    if (!isValidEmail(email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    if (message.length > 4000) {
      setStatus("error");
      setError("Message is too long (max 4000 characters).");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      const data = (await res.json()) as ContactResponse;

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(
          data.ok ? "Something went wrong. Please try again." : data.error,
        );
        if (!data.ok && typeof data.retryAfterSeconds === "number") {
          setCooldownSeconds(data.retryAfterSeconds);
        }
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-medium text-[var(--color-foreground)]">
          Message sent.
        </p>
        <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
          Thanks for reaching out. We&apos;ll reply soon.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-semibold text-[var(--color-foreground)] shadow-[0_1px_2px_rgb(0_0_0_/_0.06)] hover:bg-[var(--color-surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] disabled:opacity-60"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} aria-describedby={helpTextId}>
      <p id={helpTextId} className="text-sm text-[var(--color-foreground-muted)]">
        Fields marked with <span aria-hidden="true">*</span> are required.
      </p>

      <div className="mt-6 grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--color-foreground)]">
            Name <span aria-hidden="true">*</span>
          </span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            disabled={isBusy}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-foreground)] shadow-[inset_0_1px_1px_rgb(0_0_0_/_0.04)] placeholder:text-[var(--color-foreground-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] disabled:opacity-60"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--color-foreground)]">
            Email <span aria-hidden="true">*</span>
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={isBusy}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-foreground)] shadow-[inset_0_1px_1px_rgb(0_0_0_/_0.04)] placeholder:text-[var(--color-foreground-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] disabled:opacity-60"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--color-foreground)]">
            Message <span aria-hidden="true">*</span>
          </span>
          <textarea
            name="message"
            required
            rows={6}
            disabled={isBusy}
            className="w-full resize-y rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-foreground)] shadow-[inset_0_1px_1px_rgb(0_0_0_/_0.04)] placeholder:text-[var(--color-foreground-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] disabled:opacity-60"
          />
        </label>

        <label className="sr-only" aria-hidden="true">
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            type="text"
            disabled={isBusy}
          />
        </label>

        {status === "error" && error ? (
          <div
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm text-[var(--color-foreground)]"
            role="alert"
            id={errorId}
          >
            <p className="font-medium">Couldn&apos;t send message</p>
            <p className="mt-1 text-[var(--color-foreground-muted)]">{error}</p>
            {typeof cooldownSeconds === "number" ? (
              <p className="mt-1 text-[var(--color-foreground-muted)]">
                Try again in about {cooldownSeconds} seconds.
              </p>
            ) : null}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isBusy}
          aria-describedby={status === "error" ? errorId : undefined}
          className="inline-flex w-full items-center justify-center rounded-lg bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-[var(--color-accent-contrast)] shadow-[0_10px_25px_rgb(234_88_12_/_0.15)] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] disabled:opacity-60 sm:w-auto"
        >
          {isBusy ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

