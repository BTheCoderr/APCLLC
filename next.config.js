/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['apcllc.co'],
  },
  // Netlify specific settings
  trailingSlash: false,
  distDir: 'out',
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://apcllc.co',
  },
  // Disable image optimization since Netlify handles it
  swcMinify: true,
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig; 