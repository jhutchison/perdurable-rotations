import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout canceled",
  robots: { index: false, follow: false },
};

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-foreground)]">
        Canceled
      </h1>
      <p className="mt-4 text-[var(--color-foreground-muted)]">
        Checkout was canceled. No charge was made.
      </p>
      <p className="mt-8">
        <Link
          href="/catalog"
          className="font-medium text-[var(--color-accent)] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
        >
          Return to catalog
        </Link>
      </p>
    </div>
  );
}
