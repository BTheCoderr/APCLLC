/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['apcllc.co'],
  },
  // Netlify specific settings
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://apcllc.co',
    RESEND_API_KEY: process.env.RESEND_API_KEY || 're_QQwPHVih_BPqM2kAD4LZ7xEGyuPequ6bA',
  },
  // SWC minification is enabled by default in Next.js 13+
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig; 