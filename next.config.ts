import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/guide', destination: '/ressources/guide-15-experiences', permanent: true },
      { source: '/guide/merci', destination: '/ressources/guide-15-experiences/merci', permanent: true },
      { source: '/conseil', destination: '/consulting', permanent: true },
    ]
  },
};

export default nextConfig;
