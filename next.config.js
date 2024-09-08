// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_IMG_HOSTNAME,
        port: '',
      },
    ],
  },
  experimental: {
    instrumentationHook: true,
  },
};

// Import the plugin and wrap the Next.js config if you still want to use it
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin(
  // Specify a custom path for i18n.js
  './src/plugins/i18n.js'
);

// Export the configuration
module.exports = withNextIntl(nextConfig);
