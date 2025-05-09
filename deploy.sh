#!/bin/bash

# Deploy script for Netlify that ensures API routes are properly set up

echo "Starting deployment process..."
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies
npm ci

# Make sure the environment variables are set
if [ -z "$RESEND_API_KEY" ]; then
  echo "Setting default RESEND_API_KEY"
  export RESEND_API_KEY="re_gM2u71jT_GrykTSRkLunWLHuvtGcQTi7p"
fi

if [ -z "$NEXT_PUBLIC_BASE_URL" ]; then
  echo "Setting default NEXT_PUBLIC_BASE_URL"
  export NEXT_PUBLIC_BASE_URL="https://apcllc.co"
fi

# Build the application
npm run build

echo "Deployment process completed!" 