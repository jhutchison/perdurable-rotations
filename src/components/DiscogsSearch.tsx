"use client";

import Image from "next/image";
import { useId, useState } from "react";

type ReleaseHit = {
  id: number;
  title: string;
  year?: string;
  thumb?: string;
  uri?: string;
};

export function DiscogsSearch() {
  const id = useId();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReleaseHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/discogs/search?q=${encodeURIComponent(q)}`,
      );
      const data = (await res.json()) as {
        results?: ReleaseHit[];
        error?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Search failed.");
        setResults([]);
        return;
      }
      setResults(data.results ?? []);
    } catch {
      setError("Could not reach the server.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm"
      aria-labelledby={`${id}-heading`}
    >
      <h2
        id={`${id}-heading`}
        className="text-lg font-semibold text-[var(--color-foreground)]"
      >
        Look up a release (Discogs)
      </h2>
      <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
        Search runs on our server so your Discogs token stays private.
      </p>
      <form className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={search}>
        <div className="min-w-0 flex-1">
          <label
            htmlFor={`${id}-q`}
            className="block text-sm font-medium text-[var(--color-foreground)]"
          >
            Search
          </label>
          <input
            id={`${id}-q`}
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            className="mt-1 w-full min-h-11 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-[var(--color-foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
            placeholder="Artist or album"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] disabled:opacity-50"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>
      {error ? (
        <p className="mt-3 text-sm text-red-700 dark:text-red-300" role="alert">
          {error}
        </p>
      ) : null}
      {results.length > 0 ? (
        <ul className="mt-6 divide-y divide-[var(--color-border)]" role="list">
          {results.map((r) => (
            <li key={r.id} className="flex gap-4 py-4 first:pt-2">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-[var(--color-surface-muted)]">
                {r.thumb ? (
                  <Image
                    src={r.thumb}
                    alt=""
                    width={64}
                    height={64}
                    className="object-cover"
                    unoptimized
                  />
                ) : null}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-[var(--color-foreground)]">
                  {r.title}
                </p>
                {r.year ? (
                  <p className="text-sm text-[var(--color-foreground-muted)]">
                    {r.year}
                  </p>
                ) : null}
                {r.uri ? (
                  <a
                    href={`https://www.discogs.com${r.uri}`}
                    className="mt-1 inline-block text-sm text-[var(--color-accent)] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Discogs
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
