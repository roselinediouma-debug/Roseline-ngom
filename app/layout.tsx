import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/seo/metadata";
import {
  organizationSchema,
  personSchema,
  webSiteSchema,
} from "@/lib/seo/jsonld";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Roseline Ngom — Désirabilité des nations francophones",
    template: "%s, Roseline Ngom",
  },
  description:
    "Stratège en attractivité des territoires, IA et récit des nations. Je conseille les destinations, les institutions et les organisations du monde francophone qui veulent accroître leur désirabilité.",
  keywords: [
    "Roseline Ngom",
    "désirabilité des nations",
    "attractivité territoriale",
    "stratégie touristique",
    "marketing territorial",
    "nations francophones",
    "Afrique francophone",
    "transformation IA",
    "souveraineté algorithmique",
    "récit national",
    "indice désirabilité",
    "marque pays",
  ],
  authors: [{ name: "Roseline Ngom", url: SITE_URL }],
  creator: "Roseline Ngom",
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
    languages: {
      'fr-FR': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title:
      "Roseline Ngom — Désirabilité des nations francophones",
    description:
      "Stratège en attractivité des territoires, IA et récit des nations. Conseil aux destinations, institutions et organisations du monde francophone.",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Roseline Ngom — Désirabilité des nations francophones')}&subtitle=${encodeURIComponent('Stratège en attractivité des territoires, IA et récit des nations.')}`,
        width: 1200,
        height: 630,
        alt: "Roseline Ngom — Désirabilité des nations francophones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roseline Ngom — Désirabilité des nations francophones",
    description:
      "Stratège en attractivité des territoires, IA et récit des nations. Conseil aux destinations et institutions du monde francophone.",
    images: [`${SITE_URL}/api/og?title=${encodeURIComponent('Roseline Ngom — Désirabilité des nations francophones')}&subtitle=${encodeURIComponent('Stratège en attractivité, IA et récit des nations.')}`],
    creator: "@roselinengom",
    site: "@roselinengom",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    // À remplir après création de la propriété Google Search Console
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: "Travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${dmSans.variable} ${poppins.variable}`}
    >
      <head>
        <JsonLd data={[webSiteSchema(), organizationSchema(), personSchema()]} />
      </head>
      <body
        className="min-h-screen antialiased"
        style={{ backgroundColor: "#FEFCF9", color: "#0A0A0A" }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
