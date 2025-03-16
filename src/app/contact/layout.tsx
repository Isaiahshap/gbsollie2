import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with G.B. Sollie for book signings, speaking engagements, or just to share your thoughts',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Subtle contact background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128] to-[#0d1e4a] z-0" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 