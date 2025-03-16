import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'G.B. Sollie\'s terms of service - the conditions and rules for using our website and services',
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Simple clean background for policy pages */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128] to-[#0e1a36] z-0" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 