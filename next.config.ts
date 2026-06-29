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
      // C-bis Phase 1 — Voyages 301 vers tripafro.com (pages existantes côté tripafro)
      { source: '/voyages', destination: 'https://tripafro.com/fr/circuits', permanent: true },
      { source: '/voyages/retour-aux-sources', destination: 'https://tripafro.com/fr/circuits/retour-aux-sources', permanent: true },
      { source: '/voyages/voyage-signature', destination: 'https://tripafro.com/fr/sur-mesure', permanent: true },
      { source: '/voyages/back-to-senegal', destination: 'https://tripafro.com/fr/diaspora', permanent: true },

      // Legacy V1 (à conserver)
      { source: '/guide', destination: '/ressources/guide-15-experiences', permanent: true },
      { source: '/guide/merci', destination: '/ressources/guide-15-experiences/merci', permanent: true },
      { source: '/conseil', destination: '/consulting', permanent: true },
    ]
  },
};

export default nextConfig;
