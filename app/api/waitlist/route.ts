import { resolveMx } from "node:dns/promises";
import { emailDomain, workEmailError } from "@/lib/companyEmail";

/**
 * True unless DNS clearly says the domain can't receive mail.
 * Timeouts and resolver hiccups fail open so they never block a real signup.
 */
async function canReceiveMail(domain: string) {
  try {
    const records = await Promise.race([
      resolveMx(domain),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)),
    ]);
    if (records === null) return true;
    // A "null MX" (RFC 7505) means the domain explicitly accepts no mail.
    return records.some((r) => r.exchange && r.exchange !== ".");
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    return code !== "ENOTFOUND" && code !== "ENODATA";
  }
}

export async function POST(request: Request) {
  let body: { email?: unknown; source?: unknown } | null;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const invalid = workEmailError(email);
  if (invalid) return Response.json({ error: invalid }, { status: 400 });

  const domain = emailDomain(email);
  if (!(await canReceiveMail(domain))) {
    return Response.json(
      { error: `We couldn't find a mail server for @${domain}. Please check your work email.` },
      { status: 400 },
    );
  }

  const url = process.env.WAITLIST_WEBHOOK_URL;
  const secret = process.env.WAITLIST_WEBHOOK_SECRET;
  if (!url || !secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("[waitlist] WAITLIST_WEBHOOK_URL / WAITLIST_WEBHOOK_SECRET are not set");
      return Response.json({ error: "The waitlist isn't available right now. Please try again later." }, { status: 500 });
    }
    console.warn(`[waitlist] webhook not configured, signup NOT saved: ${email}`);
    return Response.json({ ok: true });
  }

  // Google Apps Script web app: appends a row to the sheet and emails the team (see integrations/google-sheets).
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        email,
        domain,
        source: typeof body?.source === "string" ? body.source.slice(0, 100) : "",
        userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? "",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) throw new Error(data?.error ?? `webhook responded ${res.status}`);
  } catch (err) {
    console.error("[waitlist] failed to save signup:", err);
    return Response.json({ error: "We couldn't save your signup. Please try again in a moment." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
