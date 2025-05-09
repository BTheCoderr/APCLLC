#!/bin/bash

# Netlify build script for debugging deployment issues

# Print Nodejs version
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Print environment info
echo "NEXT_PUBLIC_BASE_URL: $NEXT_PUBLIC_BASE_URL"
echo "NODE_ENV: $NODE_ENV"
echo "NETLIFY: $NETLIFY"

# Clean up any previous builds
rm -rf .next

# Install dependencies
npm ci

# Build the app
npm run build

echo "Build completed successfully!"

# List output directories
echo "Contents of the '.next' directory:"
ls -la .next

echo "Netlify build script completed." 