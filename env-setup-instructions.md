# Environment Variables Setup

Create a gitignored `.env.local` file using the names in `.env.example`.

Do not put secret values in git, screenshots, or documentation.

Server-only names that must exist in the Netlify UI for Production and Deploy Previews:

- `RESEND_API_KEY`
- `DATABASE_URL`
- `ADMIN_API_KEY`

Public site URL names:

- `NEXT_PUBLIC_METADATA_BASE_URL=https://apcllc.co`
- `NEXT_PUBLIC_BASE_URL=https://apcllc.co`

Restart the development server after changing local env files.
