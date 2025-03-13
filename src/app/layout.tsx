'use client';

import { Playfair_Display, Quicksand, Nunito } from "next/font/google";
import { DefaultSeo } from 'next-seo';
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#122848" />
        <link rel="icon" href="/favicon.ico" />
        <DefaultSeo
          titleTemplate="%s | G.B. Sollie"
          defaultTitle="G.B. Sollie | Children's Fantasy Author"
          additionalLinkTags={[
            {
              rel: 'icon',
              href: '/favicon.ico',
            },
          ]}
        />
      </head>
      <body
        className={`${playfairDisplay.variable} ${quicksand.variable} ${nunito.variable} min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
