'use client';

import Link from 'next/link';
import Section from '@/components/ui/Section';

export default function NotFound() {
  return (
    <Section className="bg-primary text-white min-h-[70vh] flex flex-col justify-center">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-display mb-8">Page Not Found</h2>
        <p className="text-xl mb-10 text-white/80">
          Sorry, the page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all"
        >
          Return Home
        </Link>
      </div>
    </Section>
  );
} 