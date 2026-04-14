import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout success",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-foreground)]">
        Thank you
      </h1>
      <p className="mt-4 text-[var(--color-foreground-muted)]">
        Your payment was received. This is a sample flow — fulfillment hooks
        live in the Stripe webhook handler.
      </p>
      {sessionId ? (
        <p className="mt-2 text-sm text-[var(--color-foreground-muted)]">
          Session ID:{" "}
          <span className="font-mono text-[var(--color-foreground)]">
            {sessionId}
          </span>
        </p>
      ) : null}
      <p className="mt-8">
        <Link
          href="/catalog"
          className="font-medium text-[var(--color-accent)] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
        >
          Back to catalog
        </Link>
      </p>
    </div>
  );
}
