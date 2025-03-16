import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A Journey to the Light',
  description: 'Explore the magical journey of faith and discovery in G.B. Sollie\'s book "A Journey to the Light"',
};

export default function JourneyToLightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Journey theme gradient with light elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1128] via-[#122848] to-[#1e335e] z-0" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 