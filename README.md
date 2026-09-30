# All Purpose Contractors LLC

<!-- repo-intro:start -->
**Project snapshot:** The production website for All Purpose Contractors LLC, an owner-operated cargo-van logistics business, built around clear service presentation, mobile-first conversion paths, and quote/contact workflows.

**What it demonstrates:** Next.js 15 · React 19 · TypeScript · Tailwind CSS · responsive business UX · form/email integrations · Netlify production delivery.
<!-- repo-intro:end -->

**Live site:** https://apcllc.co

APC's site is designed to turn a local logistics business into a credible, usable web presence without burying visitors in a complicated freight platform.

## Product at a glance

| Area | Current site |
| --- | --- |
| Business | Owner-operated cargo-van delivery / moving support |
| UX | Mobile-first service discovery and conversion |
| Lead flow | Quote and contact workflows |
| Frontend | Next.js + React + Tailwind + Framer Motion |
| Form/data integrations | React Hook Form plus server/email/data integration packages |
| Hosting | Netlify |
| SEO | Sitemap/robots and service-oriented route structure |

## Conversion-first design

The site prioritizes the actions a real customer is likely to need:

- understand available cargo-van/logistics services
- see the company positioning quickly
- request a quote
- contact the business from mobile
- move between service pages without hunting through a large navigation system

The mobile experience is treated as a first-class conversion surface rather than a desktop layout squeezed onto a phone.

## Tech stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- React Hook Form
- Framer Motion
- Resend / Nodemailer-capable email workflows
- Supabase / Postgres / MongoDB packages available for server-side integrations
- Netlify

## Local development

```bash
npm install
npm run dev
```

Development defaults to:

```text
http://localhost:4000
```

Quality commands:

```bash
npm run typecheck
npm test
npm run build
```

## Deployment

Netlify is the production host. The repository tracks its build configuration and the site is served from the custom domain:

**https://apcllc.co**

Before a release, the important production check is not just “did the build pass?”—it is whether a real quote/contact submission reaches the intended business inbox end-to-end.

---

This repository is a production local-business build: the value is in **clarity, conversion, responsive behavior, and reliable lead capture**, not unnecessary application complexity.
