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

      // C-bis Phase 5 — Cleanup pages legacy V1 (consulting / digital-ia / outils / expertise)
      // Redirigées vers /advisory (le hub V3 des mandats / IA / souveraineté algorithmique)
      // pour préserver le jus SEO des anciens liens entrants externes.
      { source: '/consulting', destination: '/advisory', permanent: true },
      { source: '/consulting/:path*', destination: '/advisory', permanent: true },
      { source: '/digital-ia', destination: '/advisory', permanent: true },
      { source: '/digital-ia/:path*', destination: '/advisory', permanent: true },
      { source: '/expertise', destination: '/advisory', permanent: true },
      { source: '/expertise/:path*', destination: '/advisory', permanent: true },
      { source: '/outils', destination: '/travaux', permanent: true },
      { source: '/outils/:path*', destination: '/travaux', permanent: true },
      { source: '/offres', destination: '/advisory', permanent: true },

      // Legacy V1 (à conserver) — anciens liens raccourcis
      { source: '/guide', destination: 'https://tripafro.com/fr/ressources/guide-15-experiences', permanent: true },
      { source: '/guide/merci', destination: 'https://tripafro.com/fr/ressources/guide-15-experiences', permanent: true },
      { source: '/conseil', destination: '/advisory', permanent: true },
    ]
  },
};

export default nextConfig;
