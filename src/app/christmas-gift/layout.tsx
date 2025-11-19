import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perfect Christmas Gift for Ages 9-13 | Cat Luker Adventure Series',
  description: 'Give the gift of adventure and faith this Christmas! Cat Luker: The Dark Clock is the perfect present for kids ages 9-13. Biblical lessons + magical storytelling. Order now on Amazon!',
  keywords: 'christmas gift for kids, books for 9-13 year olds, christian books for children, christmas presents, adventure books, faith-based gifts, Cat Luker, youth fiction',
  openGraph: {
    title: 'Perfect Christmas Gift for Ages 9-13 | Cat Luker Adventure Series',
    description: 'Give the gift of adventure and faith this Christmas! The perfect present for kids ages 9-13.',
    type: 'website',
    images: [
      {
        url: '/images/Catlukercover.png',
        width: 1200,
        height: 630,
        alt: 'Cat Luker: The Dark Clock - Perfect Christmas Gift',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Perfect Christmas Gift for Ages 9-13',
    description: 'Give the gift of adventure and faith this Christmas!',
    images: ['/images/Catlukercover.png'],
  },
};

export default function ChristmasGiftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

