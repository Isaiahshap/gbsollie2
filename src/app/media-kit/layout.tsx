import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media Kit - G.B. Sollie | Cat Luker Chronicles',
  description: 'Official media and press kit for G.B. Sollie, author of Cat Luker: The Dark Clock. Download high-resolution images, author bio, interview questions, and promotional materials.',
  keywords: [
    'G.B. Sollie',
    'media kit',
    'press kit',
    'author bio',
    'Cat Luker',
    'Swamp Witch Chronicles',
    'Christian fantasy',
    'children\'s author',
    'interview questions',
    'promotional materials',
  ],
  openGraph: {
    title: 'Media Kit - G.B. Sollie',
    description: 'Official media and press kit for G.B. Sollie, author of Cat Luker: The Dark Clock.',
    type: 'website',
    url: 'https://www.gbsollie.com/media-kit',
    images: [
      {
        url: '/mediakit/headshot_gb.jpg',
        width: 1200,
        height: 1200,
        alt: 'G.B. Sollie - Author Headshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Kit - G.B. Sollie',
    description: 'Official media and press kit for G.B. Sollie, author of Cat Luker: The Dark Clock.',
    images: ['/mediakit/headshot_gb.jpg'],
  },
};

export default function MediaKitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

