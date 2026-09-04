# APC LLC Website Redesign Audit

**Repository:** https://github.com/BTheCoderr/APCLLC  
**Production domain:** https://apcllc.co/  
**Audit date:** 2026-09-04  
**HEAD at audit:** `edb4db64bfce85547585b3fe92ef68b24ce77641` (`main`)  
**Working branch:** `feature/apc-modern-redesign`

This audit was completed before implementation. Secret values found in the repo are **not reproduced here**. Environment-variable **names** are listed; values must stay in Netlify (or a local `.env` that is gitignored).

---

## Rebuild decision

**Refactor in place.** The existing app is a standard Next.js App Router site with working production APIs, a Netlify + `@netlify/plugin-nextjs` deployment, and a small, understandable component tree. A second project or new Netlify site is not required and would risk the live domain.

The codebase is messy (duplicate configs, mocked database, hardcoded secrets, lint/typecheck disabled in production builds), but that does not make a safe redesign impractical.

---

## 1. Framework, package manager, Node, dependencies, build

| Item | Current |
| --- | --- |
| Framework | Next.js **15.3.1** (App Router under `src/app`) |
| UI | React **19**, Tailwind CSS **3.3**, Framer Motion, React Hook Form, react-icons |
| Language | TypeScript 5 (`strict: true` in `tsconfig.json`) |
| Package manager | **npm** (`package-lock.json` lockfileVersion 3). No pnpm/yarn/bun lockfiles |
| Node (Netlify) | `NODE_VERSION = "18"` and `NPM_VERSION = "9"` in `netlify.toml` |
| Node (local) | Not pinned via `.nvmrc` / `.node-version` |
| Dev server | `next dev -p 4000` |
| Production build | `CI=false next build` (`npm run build`) |
| Netlify build | `CI=false NODE_OPTIONS=--max-old-space-size=4096 NEXT_TELEMETRY_DISABLED=1 npm run build` |
| Publish directory | `.next` |
| Plugin | `@netlify/plugin-nextjs` |
| Tests | **None** (no test script, no spec files) |
| Lint | `next lint`; ESLint rules largely disabled |
| Typecheck during build | Disabled (`typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds` in `next.config.js`) |

Notable dependencies: `resend`, `@supabase/supabase-js`, `postgres`, `mongodb`, `nodemailer`. Quote/contact email currently goes through **Resend**. `postgres` is imported but **mocked**. `mongodb` and `nodemailer` are unused in `src/`.

Duplicate Next configs exist (`next.config.js` and `next.config.ts`). Production behavior matches `next.config.js` (unoptimized images, lint/typecheck skipped). `next.config.ts` sets `output: 'standalone'`, which is not appropriate for this Netlify setup.

---

## 2. Routing structure

**App Router** (`src/app`). No `pages/` directory.

| Route | File | Notes |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Homepage |
| `/about` | `src/app/about/page.tsx` | |
| `/services` | `src/app/services/page.tsx` | Single services index |
| `/contact` | `src/app/contact/page.tsx` | Contact form |
| `/quote` | `src/app/quote/page.tsx` | Quote form |
| `/admin` | `src/app/admin/page.tsx` | Client-side password gate |
| `/lander` | redirect only | 301 to `/` (confirmed live) |
| `/api/quote` | `src/app/api/quote/route.ts` | POST — Resend + mocked DB |
| `/api/contact` | `src/app/api/contact/route.ts` | POST — Resend + mocked DB |
| `/api/admin/quotes` | `src/app/api/admin/quotes/route.ts` | GET — Bearer `ADMIN_API_KEY` |
| `/api/admin/contacts` | `src/app/api/admin/contacts/route.ts` | GET — Bearer `ADMIN_API_KEY` |
| `/api/webhook/resend` | `src/app/api/webhook/resend/route.ts` | POST — logs Resend events only |

**Missing vs redesign spec (to add, not replace):**

- `/services/business-delivery`
- `/services/cargo-van-transport`
- `/services/junk-removal`

Live production confirmed: `/`, `/services`, `/contact`, `/quote` return 200. `/robots.txt` and `/sitemap.xml` return **404**.

---

## 3. Tailwind and global styling

- `tailwind.config.js` content globs: `src/pages`, `src/components`, `src/app`
- Theme tokens: `primary #c62a2a`, `primary-dark #a52222`, `secondary #000000`, `accent #d4b14b`, `accent-dark #b99537`
- Font: Next.js `Inter` in `layout.tsx`; CSS also falls back to system UI
- `globals.css`: Tailwind layers plus a large amount of hand-written CSS (buttons, hero, cards, footer)
- Theme color / PWA: `#c62a2a` on black
- Logo (`public/APCLLC.jpeg`): muted red “APC”, gold van/boxes/“LLC”, black background

**Accent decision:** Keep **logo red + gold**. Safety orange would compete with the red lettering; electric lime would clash with the existing mark. Deep charcoal/midnight navy will replace flat black as the foundation, with white content sections.

---

## 4. Netlify configuration

### `netlify.toml`

- Build command and `.next` publish directory as above
- `@netlify/plugin-nextjs`
- Functions directory `.netlify/functions-internal`, esbuild bundler
- Redirect: `/lander` → `/` 301 force (live-confirmed)
- Redirect: `/api/*` → `/.netlify/functions/api/:splat` 200 force
- Dev: `npm run dev`, port 4000, framework `next`
- `[build.environment]` currently **hardcodes secret values** for `RESEND_API_KEY`, `DATABASE_URL`, and `ADMIN_API_KEY` (not listed here)
- Also sets `NEXT_PUBLIC_METADATA_BASE_URL = "https://apcllc.co"`, `TYPESCRIPT_SKIP_TYPECHECK = "true"`, `CI = "false"`

**Do not strip `[build.environment]` values from `netlify.toml` without first confirming the same names exist in the Netlify UI.** Removing them could stop quote/contact email.

### `public/_redirects`

```
/lander    /    301
/*    /index.html   200
```

The SPA catch-all is leftover CRA-style config. Production still serves Next.js HTML (plugin wins), but this file should not be treated as the routing source of truth.

### Forms

This site does **not** use Netlify Forms. Quote and contact submit via `fetch` to Next.js API routes, which send mail with Resend.

### Headers

No custom headers in `netlify.toml`. Live responses include Netlify + Next.js cache headers and HSTS.

### Production branch

- GitHub default branch: `main`
- Only remote branch at audit time: `main`
- GitHub homepage URL: `https://apcllc.co/`
- Live site: `server: Netlify`, `x-powered-by: Next.js`
- No GitHub Actions workflows
- Last production-related push: 2025-05-10 on `main`

**Conclusion:** Production is the Netlify site for this repo, serving `apcllc.co`, and is connected to **`main`**. Redesign must ship on a feature branch and stay unmerged until preview QA.

---

## 5. Forms, fields, endpoints, notifications

### Quote form (`QuoteForm` → `POST /api/quote`)

| Field name | UI label | Required in UI | Required in API |
| --- | --- | --- | --- |
| `name` | Full Name | yes | yes |
| `email` | Email Address | yes | yes |
| `phone` | Phone Number | yes | yes |
| `serviceType` | Service Type | yes | yes |
| `pickupLocation` | Pickup Location | yes | yes |
| `deliveryLocation` | Delivery Location | yes | yes |
| `date` | Preferred Date | yes | no (optional in API) |
| `details` | Additional Details | no | no |

**`serviceType` values (must keep):**

- `residentialMoving`
- `cargoTransport`
- `junkRemoval`
- `retailDelivery`
- `localPickup`

**Notifications:**

- Admin email: `from`/`to` `APC LLC <info@apcllc.co>`, subject `Quote Request: {service}`, `replyTo` customer email
- Customer confirmation: `from` APC LLC, `to` customer, `replyTo` `info@apcllc.co`
- Fallback if API fails: client `mailto:info@apcllc.co` with the same fields
- Success UI: “Quote Request Sent!” + reset
- Error UI: banner; then mailto fallback (so users may see success even when the API failed)

**Live probe (no PII sent):** `POST /api/quote` with `{}` returns **400** `{ "error": "Missing required fields" }` — the production route is reachable.

No photo upload exists. Adding one would require a new storage path (not supported safely by the current JSON + Resend architecture).

### Contact form (`ContactForm` → `POST /api/contact`)

| Field name | UI label | Required |
| --- | --- | --- |
| `name` | Full Name | yes |
| `email` | Email Address | yes |
| `phone` | Phone Number | yes |
| `message` | Message | yes |

Same Resend admin + customer emails and mailto fallback. Live `POST /api/contact` with `{}` returns **400**.

### Admin

- Route `/admin` is public and gated by a **hardcoded client-side password**
- API key compared to `ADMIN_API_KEY` (with a hardcoded fallback in source)
- Database reads use the mocked SQL client, so the dashboard falls back to **sample rows** when fetch fails
- Preserve the route and API shape; do not “improve” auth in a way that locks the owner out

---

## 6. Domain, assets, metadata, SEO, analytics

| Asset / file | Status |
| --- | --- |
| Custom domain | `apcllc.co` (live, HTTPS, HSTS) |
| Logo | `public/APCLLC.jpeg` (512×512). Keep. |
| Favicon | `src/app/favicon.ico`; layout also uses `/APCLLC.jpeg` |
| PWA icons | `public/icons/*.png` (same JPEG bytes renamed; not true PNG sizes) |
| `manifest.json` | present |
| Service worker | `public/service-worker.js` + `RegisterSW` |
| `robots.txt` | **missing** (404) |
| `sitemap.xml` | **missing** (404) |
| Open Graph / Twitter | set in `layout.tsx`; image `/APCLLC.jpeg` |
| JSON-LD | **none** |
| Analytics / pixels | **none** in repo or live HTML |
| Street address | **not published** (location is “Rhode Island” only). Keep unpublished. |

No real customer reviews, job counts, or partner logos exist in the repository. Social proof must not invent them.

---

## 7. External integrations and contact channels

| Integration | Role | Preserve? |
| --- | --- | --- |
| Resend | Quote + contact email | **Yes** — `RESEND_API_KEY`, from/to `info@apcllc.co` |
| Next.js API routes | Form backend | **Yes** — `/api/quote`, `/api/contact` |
| Supabase / Postgres | Intended form storage | Client is **mocked**; env names `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` must remain |
| Resend webhook | `/api/webhook/resend` logs only | Keep route |
| Admin API | Bearer `ADMIN_API_KEY` | Keep names and routes |
| Phone | `(401) 602-4943` / `tel:+14016024943` | Keep. Fix placeholder `tel:+1234567890` on `/quote` |
| Email | `info@apcllc.co` | Keep |
| SMS | **not present** | Add `sms:+14016024943` |
| Instagram | `https://www.instagram.com/apcllcri` (footer) | Keep URL; verify with owner |
| Facebook | footer `apcllcri`; contact page uses generic `facebook.com` | Keep intended URL |
| Twitter | `https://twitter.com/apcllcri` | Keep URL; verify |
| LinkedIn | company URL in footer | Keep URL; verify |
| Tracking events | none | Do not invent analytics |

**Environment variable names in use (values omitted):**

- `RESEND_API_KEY`
- `DATABASE_URL`
- `ADMIN_API_KEY`
- `NEXT_PUBLIC_METADATA_BASE_URL`
- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Also referenced in setup docs: `EMAIL_USER`, `EMAIL_PASS`, `CONTACT_EMAIL`, `QUOTE_EMAIL`

---

## 8. Git status at audit

- Cloned from `origin/main` at `edb4db6`
- Working tree clean
- Only remote branch: `main`
- Uncommitted work: none at audit start

---

## 9. Reusable components and assets to retain

**Keep and restyle (do not discard the underlying business behavior):**

- `Navbar`, `Footer`, `Hero`, `Services`, `AboutSection`, `CTASection`
- `QuoteForm`, `ContactForm` (same POST URLs and field names)
- `LoadingSpinner`, `error.tsx`, `not-found.tsx`, `loading.tsx`
- `RegisterSW` + `public/service-worker.js` + `manifest.json` (bump cache name if assets change)
- Logo `public/APCLLC.jpeg`
- Admin dashboard page and admin API routes

**Do not keep as public claims:**

- “Federal operating authority is pending final FMCSA activation”
- Residential moving as the lead service
- Interstate household-goods moving language
- Placeholder phone `+1234567890`
- Invented reviews / stats (including admin sample names if they ever surface publicly)

---

## 10. Licensing / copy issues to correct

Homepage About currently says federal authority is **pending**. Owner instruction: FMCSA shows USDOT **active** and operating authority **authorized** for Motor Carrier of Property, **Except Household Goods**.

Verified facts to use:

- Company: All Purpose Contractors LLC (APC LLC)
- Base: Warwick, Rhode Island
- Phone: (401) 602-4943
- Email: info@apcllc.co
- USDOT: 4402106
- MC: 1728118
- Availability: 24/7
- Service: cargo van property transport, continental U.S.
- Do **not** advertise interstate household-goods moving

---

## Security notes (owner action, not blocked)

These issues already exist on `main`. They are documented so the redesign does not make them worse.

1. Secret values are committed in `netlify.toml`, `next.config.js`, API fallbacks, `setup-env.js`, and env instruction files.
2. `next.config.js` puts `RESEND_API_KEY` in the Next `env` map (risk of exposing a server secret).
3. Admin password and API key are hardcoded in client/server source.
4. Form bodies are interpolated into HTML emails without escaping (XSS in email clients).
5. Database layer is a no-op mock; submissions rely on Resend (and mailto fallback).

**Redesign constraint:** Keep env **names** and live Resend destinations. Do not rotate keys or rewrite Netlify site settings as part of this branch. Recommend the owner rotate credentials after merge, in the Netlify UI, not in git.

---

## Must preserve checklist

Use this list during implementation and PR review.

### Domain and deploy

- [ ] Same GitHub repository (`BTheCoderr/APCLLC`)
- [ ] Same Netlify site and custom domain `apcllc.co`
- [ ] No new Netlify site
- [ ] Do not merge to `main` as part of this work
- [ ] Do not force-push or rewrite history
- [ ] Keep `@netlify/plugin-nextjs`, `.next` publish, Node 18 on Netlify
- [ ] Keep `/lander` → `/` 301
- [ ] Keep Netlify env variable **names** listed above
- [ ] Do not put new secret values in git or docs

### Routes

- [ ] `/`, `/about`, `/services`, `/contact`, `/quote`, `/admin`
- [ ] `/api/quote`, `/api/contact`, `/api/admin/quotes`, `/api/admin/contacts`, `/api/webhook/resend`
- [ ] Add (do not replace) `/services/business-delivery`, `/services/cargo-van-transport`, `/services/junk-removal`

### Forms and email

- [ ] Quote still `POST /api/quote` as JSON
- [ ] Contact still `POST /api/contact` as JSON
- [ ] Preserve existing quote field names: `name`, `email`, `phone`, `serviceType`, `pickupLocation`, `deliveryLocation`, `date`, `details`
- [ ] Preserve `serviceType` enum values listed above
- [ ] Preserve contact field names: `name`, `email`, `phone`, `message`
- [ ] Email still from/to `info@apcllc.co` via Resend
- [ ] Mailto fallback to `info@apcllc.co` remains if API fails
- [ ] New quote fields are additive; extras may be appended into `details` for backward compatibility
- [ ] No photo upload unless a safe existing storage path appears (it does not)

### Business identity

- [ ] Company name, phone, email, Warwick RI (city/state only)
- [ ] USDOT 4402106 and MC 1728118 on public trust line
- [ ] Logo `APCLLC.jpeg`
- [ ] 24/7 availability
- [ ] No private street address
- [ ] No pending-authority language
- [ ] No interstate household-goods moving claims
- [ ] No fake reviews, stats, logos, or team photos

### SEO / PWA

- [ ] Keep `metadataBase` `https://apcllc.co`
- [ ] Keep Open Graph image pointing at a real asset
- [ ] Keep PWA manifest and icon paths unless replaced with real sized icons
- [ ] Add `robots.txt` and `sitemap.xml` without dropping existing URLs

---

## Implementation notes (post-audit)

- Prefer restyling existing App Router pages and shared layout components.
- Do not convert forms to Netlify Forms.
- Do not add a pricing engine or “instant quote” claim.
- Skip photo upload.
- Social proof: trust badges + labeled photo placeholders only.
- Service worker cache name must bump so visitors are not stuck on old HTML.
