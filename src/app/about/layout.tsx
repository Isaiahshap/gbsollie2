import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about G.B. Sollie, author of the Cat Luker series and other inspiring children\'s fantasy books',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128] to-[#122848] z-0" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 