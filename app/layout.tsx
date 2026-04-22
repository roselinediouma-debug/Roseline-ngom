import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Poppins } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import LeadPopup from "@/components/LeadPopup";
import Analytics from "@/components/Analytics";
import ToolChatWidget from "@/components/ToolChatWidget";
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
    default: "Roseline Ngom, voyages Sénégal & consulting tourisme",
    template: "%s, Roseline Ngom",
  },
  description:
    "Voyages immersifs au Sénégal pour la diaspora et les voyageurs curieux. Consulting digital tourisme. 10 ans d'expertise terrain par Roseline Ngom.",
  keywords: [
    "voyage Sénégal",
    "voyage sur mesure Sénégal",
    "voyage diaspora Sénégal",
    "Retour aux Sources Sénégal",
    "TripAfro",
    "Casamance",
    "Sine Saloum",
    "guide voyage Sénégal",
    "consulting digital hôtel",
    "IA tourisme",
    "Roseline Ngom",
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
      "Roseline Ngom, Experte voyage Sénégal & consulting digital tourisme",
    description:
      "Voyages immersifs au Sénégal, guides pour la diaspora, consulting digital et IA pour hôtels et agences de tourisme.",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Roseline Ngom, Experte voyage Sénégal & consulting digital tourisme')}&subtitle=${encodeURIComponent('Voyages immersifs au Sénégal, guides pour la diaspora, consulting digital et IA pour hôtels et agences de tourisme.')}`,
        width: 1200,
        height: 630,
        alt: "Roseline Ngom, Experte voyage Sénégal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roseline Ngom, Experte voyage Sénégal",
    description:
      "Voyages immersifs au Sénégal, guides pour la diaspora, consulting digital pour hôtels et agences.",
    images: [`${SITE_URL}/api/og?title=${encodeURIComponent('Roseline Ngom, Experte voyage Sénégal')}&subtitle=${encodeURIComponent('Voyages immersifs, diaspora, consulting digital tourisme.')}`],
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
        <WhatsAppButton />
        <LeadPopup />
        <ToolChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
