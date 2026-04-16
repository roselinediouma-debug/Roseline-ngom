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
      { source: '/ressources/guide-15-experiences', destination: '/guide', permanent: true },
      { source: '/conseil', destination: '/consulting', permanent: true },
    ]
  },
};

export default nextConfig;
