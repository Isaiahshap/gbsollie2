import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Books',
  description: 'Explore the wonderful books by G.B. Sollie, including the Cat Luker series and other inspiring children\'s fantasy stories',
};

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Magical books background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1128] via-[#1c2e6b] to-[#0A1128] z-0" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 