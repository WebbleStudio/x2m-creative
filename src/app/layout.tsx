import type { Metadata } from "next";
import { Raleway, Instrument_Serif } from "next/font/google"; // Import Google Fonts
import "./globals.css";
import ClientLayout from "./ClientLayout";

// Configure Raleway
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Regular, Medium, Semibold
  variable: "--font-raleway", // CSS variable for Tailwind
});

// Configure Instrument Serif
const instrument_serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"], // Typically italic uses normal weight
  style: ["italic"],
  variable: "--font-instrument-serif", // CSS variable for Tailwind
});

export const   metadata: Metadata = {
  title: {
    default: "X2M Creative - Creatività e Strategia per la Crescita del Tuo Brand",
    template: "%s | X2M Creative"
  },
  description: "X2M Creative combina creatività e strategia per far crescere il tuo brand in modo misurabile. Servizi di branding, social media strategy, video making e advertisement per aziende che vogliono distinguersi.",
  keywords: ["branding", "creative agency", "social media strategy", "video making", "advertisement", "brand growth", "marketing digitale", "creatività", "strategia"],
  authors: [{ name: "X2M Creative" }],
  creator: "X2M Creative",
  publisher: "X2M Creative",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://www.x2mcreative.com',
    siteName: 'X2M Creative',
    title: 'X2M Creative - Creatività e Strategia per la Crescita del Tuo Brand',
    description: 'X2M Creative combina creatività e strategia per far crescere il tuo brand in modo misurabile. Servizi di branding, social media strategy, video making e advertisement.',
    images: [
      {
        url: '/img/X2M.png',
        width: 1200,
        height: 630,
        alt: 'X2M Creative Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@x2marco',
    creator: '@x2marco',
          title: 'X2M Creative - Creatività e Strategia per la Crescita del Tuo Brand',
      description: 'X2M Creative combina creatività e strategia per far crescere il tuo brand in modo misurabile.',
    images: ['/img/X2M.png'],
  },
  alternates: {
    canonical: 'https://www.x2mcreative.com',
  },
  category: 'business',
  classification: 'Creative Agency',
  other: {
    'apple-mobile-web-app-title': 'X2M Creative',
    'application-name': 'X2M Creative',
    'msapplication-TileColor': '#3487F4',
    'theme-color': '#3487F4',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${raleway.variable} ${instrument_serif.variable}`}>
      <head>
        <link rel="canonical" href="https://www.x2mcreative.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/img/X2M.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="IT" />
        <meta name="geo.placename" content="Italia" />
        <meta name="referrer" content="origin-when-cross-origin" />
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
