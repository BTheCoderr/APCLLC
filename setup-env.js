const fs = require("fs");
const path = require("path");

const envContent = `# Copy this file to .env.local and fill values locally.
# Never commit real secrets.

NEXT_PUBLIC_METADATA_BASE_URL=https://apcllc.co
NEXT_PUBLIC_BASE_URL=https://apcllc.co

# Server-only. Set in Netlify UI for production and deploy previews:
# RESEND_API_KEY=
# DATABASE_URL=
# ADMIN_API_KEY=
`;

fs.writeFileSync(path.join(__dirname, ".env.example"), envContent);
console.log("Wrote .env.example with variable names only. Copy it to .env.local locally.");
