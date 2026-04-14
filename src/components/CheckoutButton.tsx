"use client";

import { useState } from "react";

export function CheckoutButton() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleCheckout() {
    setPending(true);
    setMessage(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setMessage(data.error ?? "Checkout could not be started.");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setMessage("No checkout URL returned.");
    } catch {
      setMessage("Something went wrong. Try again later.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={pending}
        className="inline-flex min-h-11 max-w-xs items-center justify-center rounded-md bg-[var(--color-accent)] px-5 py-2 text-sm font-semibold text-[var(--color-accent-contrast)] shadow-sm transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Redirecting…" : "Buy with Stripe (sample)"}
      </button>
      {message ? (
        <p className="text-sm text-[var(--color-foreground-muted)]" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
