// setup-env.js
const fs = require('fs');
const path = require('path');

// Environment variables
const envContent = `# Database configuration
# Primary connection - Session pooler format (most reliable for IPv4 networks)
DATABASE_URL=postgres://postgres.nvmtjzdgpwwgfkxitcvs:Apcllc2025%24%24@aws-0-us-east-1.pooler.supabase.com:5432/postgres

# Alternate connection options (used as fallbacks in utils/db.ts)
# DATABASE_URL_TRANSACTION=postgres://postgres.nvmtjzdgpwwgfkxitcvs:Apcllc2025%24%24@aws-0-us-east-1.pooler.supabase.com:6543/postgres
# DATABASE_URL_ALTERNATE=postgres://postgres.nvmtjzdgpwwgfkxitcvs:Apcllc2025%24%24@aws-0-us-east-2.pooler.supabase.com:5432/postgres

# Email configuration with Resend
# NOTE: With full access API key, you can send to any email address
RESEND_API_KEY=re_QQwPHVih_BPqM2kAD4LZ7xEGyuPequ6bA

# Metadata base URL for Next.js
NEXT_PUBLIC_METADATA_BASE_URL=https://apcllc.co
`;

// Write to .env.local file
fs.writeFileSync(path.join(__dirname, '.env.local'), envContent);

console.log('Environment file .env.local created successfully!'); 