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

`POST /api/assess` handles the intake form. Set `FORM_WEBHOOK_URL` in the Vercel project to forward submissions to a webhook. Without it, submissions are logged to the Vercel function logs.

## Copy rules

- No em dashes anywhere, ever. Periods, commas, or a new sentence instead.
- Every marketing line stays under two sentences.
- Industry language (line card, territory, principal, commission), never startup jargon.
