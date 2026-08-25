import { NextResponse } from "next/server";

const FORM_RECIPIENTS = ["matt@repflow.com", "jess@repflow.com"];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const agency = typeof body.agency === "string" ? body.agency.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !agency || !email || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }
  if (name.length > 200 || agency.length > 200 || email.length > 320 || message.length > 5000) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
  }

  const submission = {
    name,
    agency,
    email,
    message,
    receivedAt: new Date().toISOString(),
  };

  // Forward to a webhook (e.g. a Zapier or Make hook set in Vercel env vars).
  const webhookUrl = process.env.FORM_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
    } catch (err) {
      console.error("assessment webhook forward failed", err);
    }
  }

  // Email the submission to the RepFlow team via Resend.
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.FORM_FROM_EMAIL ?? "RepFlow Forms <forms@repflow.com>",
          to: FORM_RECIPIENTS,
          reply_to: email,
          subject: `New assessment request from ${agency}`,
          text: `Name: ${name}\nAgency: ${agency}\nEmail: ${email}\n\n${message}`,
        }),
      });
      if (!res.ok) {
        console.error("assessment email send failed", await res.text());
      }
    } catch (err) {
      console.error("assessment email send failed", err);
    }
  } else {
    console.error("RESEND_API_KEY not set, assessment email not sent");
  }

  // Always log so submissions stay visible in Vercel function logs even
  // when the webhook and/or email delivery above are unavailable.
  console.log("assessment request", JSON.stringify(submission));

  return NextResponse.json({ ok: true });
}
