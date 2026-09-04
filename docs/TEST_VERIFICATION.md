# Test and verification summary

Local QA on `feature/apc-modern-redesign` against a production build (`next start` on port 4000).

## Commands

| Check | Command | Result |
| --- | --- | --- |
| Install | `npm install` (repo uses npm / `package-lock.json`) | Pass |
| Unit tests | `npm test` | Pass — 8 tests |
| Lint | `npm run lint` | Pass |
| Typecheck | `npm run typecheck` | Pass |
| Production build | `npm run build` | Pass (Next.js 15.3.8 after CVE patch) |

## Route checks (`next start`)

| Route | Result |
| --- | --- |
| `/` | 200 — hero, quote starter, three service cards |
| `/services` | 200 |
| `/services/business-delivery` | 200 |
| `/services/cargo-van-transport` | 200 |
| `/services/junk-removal` | 200 |
| `/about` | 200 — USDOT/MC present, no pending-authority copy |
| `/contact` | 200 |
| `/quote` | 200 |
| `/admin` | 200 — existing admin gate preserved |
| `/lander` | Next.js 404 locally; Netlify 301 remains in `netlify.toml` (live-confirmed on production) |
| `/sitemap.xml` | 200 — all public pages listed |
| `/robots.txt` | 200 — allows `/`, disallows `/admin` and `/api/` |
| `POST /api/quote` `{}` | 400 `{ "error": "Missing required fields" }` |
| `POST /api/contact` `{}` | 400 `{ "error": "Missing required fields" }` |

## Form and integration checks

- Quote starter Continue builds `/quote?pickupZip&deliveryZip&serviceType&date` (unit tested).
- Quote JSON still includes `name`, `email`, `phone`, `serviceType`, `pickupLocation`, `deliveryLocation`, `date`, `details`.
- `serviceType` values still include `residentialMoving`, `cargoTransport`, `junkRemoval`, `retailDelivery`, `localPickup`.
- Contact JSON still includes `name`, `email`, `phone`, `message`.
- Phone `tel:+14016024943`, email `mailto:info@apcllc.co`, text `sms:+14016024943`.
- Duplicate submit is blocked while a request is in flight.
- Photo upload is intentionally absent.
- Next.js was bumped from 15.3.1 to 15.3.8 after Netlify blocked the first preview for CVE-2025-55182. This stays on the 15.3 line.
- Resend is initialized only at request time from `RESEND_API_KEY` (no hardcoded key in application code).
- A full live email send to `info@apcllc.co` was **not** performed from this environment so a customer mailbox was not spammed. Confirm one preview-environment test quote after Netlify deploys the branch.

## Copy checks

- No “federal authority pending” language.
- Interstate household-goods moving is explicitly not offered.
- No invented reviews, ratings, job counts, or customer logos.
- USDOT 4402106 and MC 1728118 on the public trust line.

## Screenshots

- `docs/screenshots/homepage-desktop.png`
- `docs/screenshots/homepage-mobile.png`

## Preview

- Netlify preview URL: *pending first branch deploy*
