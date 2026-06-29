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

      // C-bis Phase 2 — Guides 301 vers tripafro.com (pages produit Stripe créées sur tripafro)
      { source: '/guides', destination: 'https://tripafro.com/fr/guides', permanent: true },
      { source: '/guides/guide-casamance', destination: 'https://tripafro.com/fr/guides/guide-casamance', permanent: true },
      { source: '/guides/guide-senegal-7jours', destination: 'https://tripafro.com/fr/guides/guide-senegal-7jours', permanent: true },
      { source: '/guides/bundle-decouverte', destination: 'https://tripafro.com/fr/guides/bundle-decouverte', permanent: true },
      { source: '/merci/:product*', destination: 'https://tripafro.com/fr/guides/merci/:product*', permanent: true },

      // C-bis Phase 3 — Lead magnets 301 vers tripafro.com
      { source: '/ressources/guide-15-experiences', destination: 'https://tripafro.com/fr/ressources/guide-15-experiences', permanent: true },
      { source: '/ressources/guide-15-experiences/merci', destination: 'https://tripafro.com/fr/ressources/guide-15-experiences', permanent: true },
      { source: '/ressources/le-bled-autrement', destination: 'https://tripafro.com/fr/diaspora', permanent: true },

      // Legacy V1 (à conserver)
      { source: '/guide', destination: '/ressources/guide-15-experiences', permanent: true },
      { source: '/guide/merci', destination: '/ressources/guide-15-experiences/merci', permanent: true },
      { source: '/conseil', destination: '/consulting', permanent: true },
    ]
  },
};

export default nextConfig;
