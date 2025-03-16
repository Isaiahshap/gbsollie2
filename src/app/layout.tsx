import { Playfair_Display, Quicksand, Nunito } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

import ClientLayout from "@/components/layout/ClientLayout";

// Font configurations
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-enchanted",
  weight: ["400", "500", "700"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-whimsical",
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-readable",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | G.B. Sollie',
    default: 'G.B. Sollie | Children\'s Fantasy Author',
  },
  description: 'G.B. Sollie is an author of captivating children\'s fantasy books.',
  icons: {
    icon: '/favicon.ico',
  },
  themeColor: '#122848',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfairDisplay.variable} ${quicksand.variable} ${nunito.variable} min-h-screen flex flex-col`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
