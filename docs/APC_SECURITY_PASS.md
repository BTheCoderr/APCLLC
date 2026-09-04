# Security pass (PR #1)

Date: 2026-09-04  
Branch: `feature/apc-modern-redesign`

Secret **values** are omitted from this document.

## Git history

Literal secret-shaped values for `RESEND_API_KEY`, `DATABASE_URL`, and `ADMIN_API_KEY` **were committed** in earlier history (`netlify.toml`, `next.config.js`, API fallbacks, `setup-env.js`, `deploy.sh`, env instruction files, and the old `/admin` client page).

Removing them from the current tree does **not** remove them from git history. Those credentials must be rotated.

### Rotate

- Resend API key (`RESEND_API_KEY`) — including any older keys that appeared in `deploy.sh`
- Postgres / Supabase database password (`DATABASE_URL`)
- Admin API secret (`ADMIN_API_KEY`)
- The former client-side admin password (no longer used; still rotate anything that matched it)
- Mailbox password previously stored under `EMAIL_PASS` in instruction files, if that inbox password is still in use

After rotation, set the new values in the Netlify UI only (Production and Deploy Previews). Do not put them in git.

## `.env` ignore rules

`.gitignore` now ignores `.env` and `.env.*`, with `.env.example` allowed. No `.env` secret files are tracked.

## Server-side environment usage

| Name | Read where | Browser / `NEXT_PUBLIC_` |
| --- | --- | --- |
| `RESEND_API_KEY` | `/api/quote`, `/api/contact` only | No |
| `DATABASE_URL` | `src/utils/db.ts` (server) | No |
| `ADMIN_API_KEY` | admin API guard (server) | No |

Must be set in **Production** and **Deploy Previews**:

- `RESEND_API_KEY`
- `DATABASE_URL`
- `ADMIN_API_KEY`

Public, non-secret:

- `NEXT_PUBLIC_METADATA_BASE_URL`
- `NEXT_PUBLIC_BASE_URL`

There are no hardcoded secret fallbacks in application code.

## `/admin`

The client-side password gate is removed. `/admin` returns 404 until a real HttpOnly-cookie session is built. `/api/admin/quotes` and `/api/admin/contacts` require a server-side `ADMIN_API_KEY` bearer token, rate-limit failed attempts, and return no customer records without that check.

Follow-up: replace the disabled dashboard with cookie sessions, logout, and expiry.
