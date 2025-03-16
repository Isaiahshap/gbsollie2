import type { Metadata } from 'next';
import NorthernLights from '@/components/effects/NorthernLights';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Explore articles, updates, and behind-the-scenes content from children\'s fantasy author G.B. Sollie',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-[#0A1128] min-h-screen overflow-hidden">
      {/* Northern Lights Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#0A1128] bg-opacity-90"></div>
        <NorthernLights />
      </div>

      {children}
    </div>
  );
} 