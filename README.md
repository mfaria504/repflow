# RepFlow

Marketing site for [repflow.com](https://repflow.com). Fractional RevOps for manufacturers' representative agencies.

## Stack

- Next.js (App Router) on Vercel
- Tailwind CSS v4, design tokens defined in `app/globals.css`
- Framer Motion for spring physics and the hero load sequence
- Space Grotesk, IBM Plex Sans, IBM Plex Mono via `next/font`

## Development

```bash
npm install
npm run dev
```

## Assessment form

`POST /api/assess` handles the intake form. Submissions are emailed to `matt@repflow.com` and `jess@repflow.com` via [Resend](https://resend.com) — set `RESEND_API_KEY` in the Vercel project, and `FORM_FROM_EMAIL` if the default sender (`forms@repflow.com`) isn't a verified sending address on the account. Optionally set `FORM_WEBHOOK_URL` to also forward submissions to a webhook (e.g. Zapier or Make). Submissions are always logged to the Vercel function logs regardless.

## Copy rules

- No em dashes anywhere, ever. Periods, commas, or a new sentence instead.
- Every marketing line stays under two sentences.
- Industry language (line card, territory, principal, commission), never startup jargon.
