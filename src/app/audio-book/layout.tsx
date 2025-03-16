import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audio Books',
  description: 'Experience G.B. Sollie\'s magical stories through professionally narrated audiobooks',
};

export default function AudioBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Audio theme gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128] via-[#102041] to-[#0A1128] z-0" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 