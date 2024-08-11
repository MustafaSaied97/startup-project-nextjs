/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'api.cezma.cloud',
      //   port: '',
      //   // pathname: '/storage/offers/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'beta-cezma.hmaserv.online',
      //   port: '',
      // },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_IMG_HOSTNAME,
        port: '',
      },
    ],
  },
  // images: {
  //   domains: ['primefaces.org', 'api.cezma.cloud'],
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: '/wishlist',
  //       destination: '/login',
  //       permanent: false,
  //       locale: false,
  //     },
  //   ];
  // },
  experimental: {
    instrumentationHook: true,
  },
};

const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin(
  // Specify a custom path for i18n.js
  './src/plugins/i18n.js'
);

module.exports = withNextIntl(nextConfig);
