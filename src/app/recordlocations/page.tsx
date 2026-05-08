import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Record locations",
  description: "Where to find Perdurable Rotations events and outreach boxes.",
};

type RecordLocation = {
  id: string;
  name: string;
  address: string;
  details?: string;
  mapUrl?: string;
  upcomingEvent?: {
    title: string;
    date: string;
    time?: string;
  };
};

const PLACEHOLDER_LOCATIONS: RecordLocation[] = [
  {
    id: "agricole-popup-5-23",
    name: "Agricole Farm Stop Pop-up",
    address: "118 N Main St, Chelsea, MI 48118",
    details: "Pop-up crate dig, turntable on premises to listen to your picks",
    upcomingEvent: { title: "Pop-up", date: "Saturday, May 23rd", time: "10am-2pm" },
  },
  {
    id: "agricole-popup-5-30",
    name: "Agricole Farm Stop Pop-up",
    address: "118 N Main St, Chelsea, MI 48118",
    details: "Pop-up crate dig, turntable on premises to listen to your picks",
    upcomingEvent: { title: "Pop-up", date: "Saturday, May 30th", time: "10am-2pm" },
  },
  {
    id: "outreach-box-1",
    name: "Vinyl Outreach Crate at Withington's",
    address: "112 Main St, Chelsea, MI 48118",
    details: "Permanent rotating crate. Ask Jay what's good in the beer section.",
  },
] as const;

function MapLink({ mapUrl }: { mapUrl?: string }) {
  if (!mapUrl) return null;
  return (
    <a
      href={mapUrl}
      target="_blank"
      rel="noreferrer"
      className="text-sm font-medium text-[var(--color-foreground)] underline underline-offset-4 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
    >
      Open in Maps
    </a>
  );
}

export default function RecordLocationsPage() {
  return (
    <div className="relative px-4 py-10 sm:px-6 sm:py-14">
      <Image
        src="/motown_label_horizontal.jpeg"
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

      <div className="mx-auto w-full max-w-5xl">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-normal text-[var(--color-foreground)] sm:text-4xl">
        Record Browsing Locations
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--color-foreground-muted)]">
        Here’s where you can browse Perdurable Rotations in person. 
      </p>

      <div className="mt-6 inline-flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-[var(--color-accent-contrast)] shadow-[0_10px_25px_rgb(234_88_12_/_0.15)] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
        >
          Suggest a location
        </Link>
      </div>

      <section className="mt-10" aria-labelledby="locations-heading">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="locations-heading"
              className="text-xl font-semibold text-[var(--color-foreground)]"
            >
              Locations & events
            </h2>
          </div>
        </div>

        <ul
          id="locations"
          className="mt-6 grid gap-4 sm:grid-cols-2"
        >
          {PLACEHOLDER_LOCATIONS.map((location) => (
            <li
              key={location.id}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-[var(--color-foreground)]">
                    {location.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
                    {location.address}
                  </p>
                </div>
                <MapLink mapUrl={location.mapUrl} />
              </div>

              {location.details ? (
                <p className="mt-3 text-sm text-[var(--color-foreground)]">
                  {location.details}
                </p>
              ) : null}

              {location.upcomingEvent ? (
                <div className="mt-4 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2">
                  <p className="text-sm font-medium text-[var(--color-foreground)]">
                    Next event: {location.upcomingEvent.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--color-foreground-muted)]">
                    {location.upcomingEvent.date}
                    {location.upcomingEvent.time
                      ? ` · ${location.upcomingEvent.time}`
                      : ""}
                  </p>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
      </div>
    </div>
  );
}

