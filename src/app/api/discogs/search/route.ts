import { NextRequest, NextResponse } from "next/server";

type DiscogsSearchResult = {
  id: number;
  title?: string;
  year?: string;
  thumb?: string;
  uri?: string;
};

type DiscogsSearchResponse = {
  results?: DiscogsSearchResult[];
};

function mapResults(raw: DiscogsSearchResult[]) {
  return raw.map((r) => ({
    id: r.id,
    title: r.title ?? "Untitled",
    year: r.year,
    thumb: r.thumb,
    uri: r.uri,
  }));
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q) {
    return NextResponse.json({ error: "Missing query parameter q." }, {
      status: 400,
    });
  }

  const token = process.env.DISCOGS_PERSONAL_TOKEN;
  if (!token) {
    return NextResponse.json(
      {
        error:
          "Discogs is not configured. Set DISCOGS_PERSONAL_TOKEN on the server.",
        results: [],
      },
      { status: 503 },
    );
  }

  const userAgent =
    process.env.DISCOGS_USER_AGENT ??
    "PerdurableRotations/1.0 +https://example.com";

  const url = new URL("https://api.discogs.com/database/search");
  url.searchParams.set("q", q);
  url.searchParams.set("type", "release");
  url.searchParams.set("per_page", "10");

  const upstream = await fetch(url.toString(), {
    headers: {
      "User-Agent": userAgent,
      Authorization: `Discogs token=${token}`,
    },
    next: { revalidate: 3600 },
  });

  if (!upstream.ok) {
    return NextResponse.json(
      {
        error: "Discogs request failed.",
        detail: upstream.status,
        results: [],
      },
      { status: 502 },
    );
  }

  const data = (await upstream.json()) as DiscogsSearchResponse;
  const releases = (data.results ?? []).filter(
    (r): r is DiscogsSearchResult => typeof r?.id === "number",
  );

  return NextResponse.json(
    { results: mapResults(releases) },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
