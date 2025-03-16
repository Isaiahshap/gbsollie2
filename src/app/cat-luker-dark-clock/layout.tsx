import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cat Luker: The Dark Clock',
  description: 'Discover the exciting time-traveling adventure of Cat Luker in The Dark Clock, a faith-based fantasy novel for children',
};

export default function CatLukerDarkClockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Fantasy book theme gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128] via-[#1e1f4d] to-[#0A1128] z-0" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 