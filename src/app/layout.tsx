import { Playfair_Display, Quicksand, Nunito } from "next/font/google";
import "./globals.css";
import { Metadata, Viewport } from "next";
import Script from "next/script";

import ClientLayout from "@/components/layout/ClientLayout";
import StructuredData from "@/components/seo/StructuredData";

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
  metadataBase: new URL('https://www.gbsollie.com'),
  title: {
    template: '%s | G.B. Sollie',
    default: 'G.B. Sollie | Best Christian Books for Kids | Children\'s Fantasy Author',
  },
  description: 'Discover the best Christian books for kids by G.B. Sollie. Enchanting fantasy adventures that strengthen faith and spark imagination for children ages 9-13. Perfect for families, schools, and youth groups.',
  keywords: [
    'best christian books for kids',
    'christian children books',
    'christian fantasy books',
    'faith-based children literature',
    'christian books for youth',
    'children fantasy author',
    'G.B. Sollie',
    'Cat Luker',
    'christian adventure books',
    'biblical themes for kids',
    'family reading',
    'youth ministry books'
  ],
  authors: [{ name: 'G.B. Sollie' }],
  creator: 'G.B. Sollie',
  publisher: 'G.B. Sollie',
  category: 'Children\'s Christian Literature',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.gbsollie.com',
    siteName: 'G.B. Sollie - Best Christian Books for Kids',
    title: 'G.B. Sollie | Best Christian Books for Kids | Children\'s Fantasy Author',
    description: 'Discover the best Christian books for kids by G.B. Sollie. Enchanting fantasy adventures that strengthen faith and spark imagination for children ages 9-13.',
    images: [
      {
        url: '/images/Catlukercover.png',
        width: 400,
        height: 600,
        alt: 'Cat Luker: The Swamp Witch Chronicles - Best Christian Fantasy Book for Kids',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'G.B. Sollie | Best Christian Books for Kids',
    description: 'Discover the best Christian books for kids by G.B. Sollie. Enchanting fantasy adventures that strengthen faith and spark imagination.',
    images: ['/images/Catlukercover.png'],
  },
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
};

export const viewport: Viewport = {
  themeColor: '#122848',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData type="homepage" />
      </head>
      <body
        className={`${playfairDisplay.variable} ${quicksand.variable} ${nunito.variable} min-h-screen flex flex-col`}
      >
        {/* Google Analytics */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-S3XRD45CDY" 
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S3XRD45CDY', {
              page_title: document.title,
              page_location: window.location.href
            });
          `}
        </Script>
        
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
