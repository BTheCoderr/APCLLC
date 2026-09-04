#!/bin/bash

echo "Starting deployment process..."
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

npm ci

if [ -z "$RESEND_API_KEY" ]; then
  echo "RESEND_API_KEY is not set. Configure it in the environment; do not hardcode it."
fi

if [ -z "$NEXT_PUBLIC_BASE_URL" ]; then
  export NEXT_PUBLIC_BASE_URL="https://apcllc.co"
fi

npm run build

echo "Deployment process completed!"
