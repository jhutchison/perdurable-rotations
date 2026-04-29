import { Resend } from "resend";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string; // honeypot
};

function env(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function badRequest(error: string) {
  return Response.json({ ok: false as const, error }, { status: 400 });
}

function tooManyRequests(error: string, retryAfterSeconds: number) {
  return Response.json(
    { ok: false as const, error, retryAfterSeconds },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    },
  );
}

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5;
const rateLimitByIp = new Map<string, number[]>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || null;
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return null;
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const existing = rateLimitByIp.get(ip) ?? [];
  const recent = existing.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    const oldest = recent[0] ?? now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldest)) / 1000),
    );
    rateLimitByIp.set(ip, recent);
    return { limited: true as const, retryAfterSeconds };
  }
  recent.push(now);
  rateLimitByIp.set(ip, recent);
  return { limited: false as const, retryAfterSeconds: 0 };
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const website = String(payload.website ?? "").trim();

  if (website) {
    return Response.json({ ok: true as const }, { status: 200 });
  }

  if (!name || !email || !message) {
    return badRequest("Name, email, and message are required.");
  }
  if (!isValidEmail(email)) {
    return badRequest("Email is invalid.");
  }
  if (name.length > 120) {
    return badRequest("Name is too long.");
  }
  if (message.length > 4000) {
    return badRequest("Message is too long.");
  }

  const ip = getClientIp(request);
  if (ip) {
    const limit = isRateLimited(ip);
    if (limit.limited) {
      return tooManyRequests(
        "Too many messages sent from this network. Please try again soon.",
        limit.retryAfterSeconds,
      );
    }
  }

  const resend = new Resend(env("RESEND_API_KEY"));
  const to = env("CONTACT_TO_EMAIL");
  const from = env("CONTACT_FROM_EMAIL");

  try {
    await resend.emails.send({
      from,
      to,
      subject: `Perdurable Rotations Contact From - ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown email send error";
    console.error("Contact email send failed:", message);
    return Response.json(
      { ok: false as const, error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true as const }, { status: 200 });
}

