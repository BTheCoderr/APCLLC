# APC LLC Deployment Handoff

**Branch:** `feature/apc-modern-redesign`  
**Repository:** https://github.com/BTheCoderr/APCLLC  
**Production domain:** https://apcllc.co/  
**Production branch:** `main` (do not merge until preview QA is complete)

This redesign stays in the same GitHub repository and the same Netlify site. Do not create a second site or change the custom domain.

---

## What to deploy

1. Open the pull request from `feature/apc-modern-redesign` into `main`.
2. Use the Netlify Deploy Preview for this branch (Netlify should generate one if the GitHub integration is connected to this repo).
3. Complete the verification checklist in `docs/TEST_VERIFICATION.md`.
4. Merge to `main` only after the owner approves copy, forms, and mobile layout.
5. Confirm production still serves `https://apcllc.co/` after merge.

Do not force-push. Do not deploy this branch as the production branch. Do not change Netlify site settings, DNS, or domain mapping.

---

## Netlify settings to leave alone

These already match production and were not rewritten in the Netlify UI:

| Setting | Value |
| --- | --- |
| Build command | `CI=false NODE_OPTIONS=--max-old-space-size=4096 NEXT_TELEMETRY_DISABLED=1 npm run build` |
| Publish directory | `.next` |
| Plugin | `@netlify/plugin-nextjs` |
| Node | 18 |
| Next.js | 15.3.8 (patched for CVE-2025-55182; Netlify blocks 15.3.1) |
| Redirect | `/lander` → `/` 301 |

`public/_redirects` no longer includes a CRA-style `/* /index.html 200` catch-all. Next.js plus the Netlify plugin handles routing. The `/lander` redirect remains.

---

## Environment variables (names only)

Keep these names. Do not paste values into git.

- `RESEND_API_KEY`
- `DATABASE_URL`
- `ADMIN_API_KEY`
- `NEXT_PUBLIC_METADATA_BASE_URL`
- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional / documented historically:

- `EMAIL_USER`
- `EMAIL_PASS`
- `CONTACT_EMAIL`
- `QUOTE_EMAIL`

Quote and contact email still send through Resend from/to `info@apcllc.co`.

---

## Forms after deploy

| Form | Endpoint | Payload |
| --- | --- | --- |
| Quote | `POST /api/quote` | JSON, same required fields as before plus additive detail fields |
| Contact | `POST /api/contact` | JSON: `name`, `email`, `phone`, `message` |

Required quote fields still include `name`, `email`, `phone`, `serviceType`, `pickupLocation`, and `deliveryLocation`. Existing `serviceType` values are unchanged.

If Resend fails, the browser still opens a `mailto:info@apcllc.co` fallback.

Photo upload was **not** added. The current JSON + Resend path has no safe file storage.

---

## New public routes

- `/services/business-delivery`
- `/services/cargo-van-transport`
- `/services/junk-removal`
- `/sitemap.xml`
- `/robots.txt`

Existing routes `/`, `/about`, `/services`, `/contact`, `/quote`, and `/admin` remain.

---

## Owner decisions still needed

1. Confirm Instagram, Facebook, X/Twitter, and LinkedIn URLs are the live business profiles.
2. Supply real photographs listed in `docs/MISSING_ASSETS.md`.
3. Rotate credentials that currently live in git history, then store replacements only in the Netlify UI.
4. Decide whether `/admin` should keep its current client-side password gate or be replaced with real auth later.
5. Confirm whether local residential hauling should remain in the quote dropdown (it is labeled as not interstate household goods).
6. Confirm the Netlify preview URL after the first branch deploy and add it to the pull request.

---

## Rollback

If production misbehaves after merge:

1. Revert the merge commit on `main` (no history rewrite).
2. Redeploy `main` from Netlify.
3. Leave DNS and the Netlify site connection untouched.
