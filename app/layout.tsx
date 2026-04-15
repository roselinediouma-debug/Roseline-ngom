import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import LeadPopup from "@/components/LeadPopup";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roseline Ngom — Experte voyage Sénégal & Afrique de l'Ouest",
  description:
    "Découvrez le Sénégal autrement avec Roseline Ngom, fondatrice de TripAfro. Voyages immersifs, formations et conseils personnalisés.",
  keywords: "voyage Sénégal, TripAfro, Casamance, voyage Afrique, guide Sénégal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="min-h-screen antialiased" style={{ backgroundColor: '#FEFCF9', color: '#0A0A0A' }}>
        {children}
        <WhatsAppButton />
        <LeadPopup />
      </body>
    </html>
  );
}
