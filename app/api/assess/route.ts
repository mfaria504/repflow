import { NextResponse } from "next/server";

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
  // Falls back to logging so submissions are visible in Vercel function logs.
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
      console.log("assessment request", JSON.stringify(submission));
    }
  } else {
    console.log("assessment request", JSON.stringify(submission));
  }

  return NextResponse.json({ ok: true });
}
