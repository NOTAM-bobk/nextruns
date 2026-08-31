import { NextResponse } from "next/server";

/**
 * Newsletter signup endpoint.
 *
 * Supports two ways to connect a real list, checked in this order:
 *   1. Mailchimp — set MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX
 *      (e.g. "us21", the part after the dash in your API key),
 *      and MAILCHIMP_AUDIENCE_ID.
 *   2. A generic webhook — set NEWSLETTER_WEBHOOK_URL to any URL that
 *      accepts a POST of { email }. Works with Zapier, Make, a Google
 *      Sheets webhook, etc.
 *
 * These are real secrets (the Mailchimp key in particular) — set them
 * as plain Vercel Environment Variables WITHOUT the NEXT_PUBLIC_
 * prefix, so they never ship to the browser. This route is the only
 * place that reads them.
 */
export async function POST(request) {
  let email;
  try {
    const body = await request.json();
    email = body?.email?.trim();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 }
    );
  }

  const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, MAILCHIMP_AUDIENCE_ID, NEWSLETTER_WEBHOOK_URL } =
    process.env;

  if (MAILCHIMP_API_KEY && MAILCHIMP_SERVER_PREFIX && MAILCHIMP_AUDIENCE_ID) {
    try {
      const res = await fetch(
        `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64")}`,
          },
          body: JSON.stringify({ email_address: email, status: "subscribed" }),
        }
      );

      if (res.ok) {
        return NextResponse.json({ message: "You're on the list." });
      }

      const data = await res.json().catch(() => ({}));
      if (data?.title === "Member Exists") {
        return NextResponse.json({ message: "You're already subscribed." });
      }

      return NextResponse.json(
        { message: "Couldn't sign you up right now. Try again shortly." },
        { status: 502 }
      );
    } catch {
      return NextResponse.json(
        { message: "Couldn't reach the mail provider. Try again shortly." },
        { status: 502 }
      );
    }
  }

  if (NEWSLETTER_WEBHOOK_URL) {
    try {
      const res = await fetch(NEWSLETTER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        return NextResponse.json({ message: "You're on the list." });
      }
      return NextResponse.json(
        { message: "Couldn't sign you up right now. Try again shortly." },
        { status: 502 }
      );
    } catch {
      return NextResponse.json(
        { message: "Couldn't reach the signup service. Try again shortly." },
        { status: 502 }
      );
    }
  }

  return NextResponse.json(
    {
      message:
        "Signups aren't connected to a mailing list yet — add Mailchimp or webhook env vars in Vercel.",
    },
    { status: 501 }
  );
}
