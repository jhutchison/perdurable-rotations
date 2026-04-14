import type { Metadata } from "next";
import { CheckoutButton } from "@/components/CheckoutButton";
import { DiscogsSearch } from "@/components/DiscogsSearch";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Browse upcoming listings, search Discogs, and try checkout.",
};

const PLACEHOLDER_LISTINGS = [
  {
    id: "1",
    title: "Miles Davis — Kind of Blue",
    grade: "VG+ / VG+",
    price: "$24 (coming soon)",
  },
  {
    id: "2",
    title: "Joni Mitchell — Blue",
    grade: "NM / VG+",
    price: "$32 (coming soon)",
  },
  {
    id: "3",
    title: "Talking Heads — Remain in Light",
    grade: "VG / VG",
    price: "$18 (coming soon)",
  },
] as const;

export default function CatalogPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-normal text-[var(--color-foreground)] sm:text-4xl">
        Catalog
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--color-foreground-muted)]">
        Placeholder listings stand in until inventory is connected to a
        database. Use Discogs search to preview how we will enrich records, and
        Stripe for a sample purchase flow.
      </p>

      <section
        className="mt-12"
        aria-labelledby="listings-heading"
      >
        <h2
          id="listings-heading"
          className="text-xl font-semibold text-[var(--color-foreground)]"
        >
          Upcoming listings
        </h2>
        <ul className="mt-6 divide-y divide-[var(--color-border)] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
          {PLACEHOLDER_LISTINGS.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-[var(--color-foreground)]">
                  {item.title}
                </p>
                <p className="text-sm text-[var(--color-foreground-muted)]">
                  {item.grade}
                </p>
              </div>
              <p className="text-sm font-medium text-[var(--color-foreground)]">
                {item.price}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
        <DiscogsSearch />
        <section
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm"
          aria-labelledby="checkout-heading"
        >
          <h2
            id="checkout-heading"
            className="text-lg font-semibold text-[var(--color-foreground)]"
          >
            Sample checkout
          </h2>
          <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
            Requires{" "}
            <code className="rounded bg-[var(--color-surface-muted)] px-1 py-0.5 text-xs">
              STRIPE_SECRET_KEY
            </code>
            ,{" "}
            <code className="rounded bg-[var(--color-surface-muted)] px-1 py-0.5 text-xs">
              STRIPE_PRICE_ID
            </code>
            , and{" "}
            <code className="rounded bg-[var(--color-surface-muted)] px-1 py-0.5 text-xs">
              NEXT_PUBLIC_APP_URL
            </code>{" "}
            in your environment.
          </p>
          <div className="mt-4">
            <CheckoutButton />
          </div>
        </section>
      </div>
    </div>
  );
}
