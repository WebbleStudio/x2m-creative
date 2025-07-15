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

export const metadata: Metadata = {
  title: "X2Marco Website", // Updated title
  description: "Creativity and Strategy for measurable brand growth.", // Updated description
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${raleway.variable} ${instrument_serif.variable}`}>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
