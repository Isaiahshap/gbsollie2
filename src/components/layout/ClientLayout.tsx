'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if we're on a funnel page
  const isFunnelPage = pathname === '/youthdirectors' || pathname === '/librarian';
  
  // Don't show header/footer on funnel pages
  return (
    <>
      {!isFunnelPage && <Header />}
      <main className={`flex-grow ${!isFunnelPage ? 'pt-16' : ''}`}>
        {children}
      </main>
      {!isFunnelPage && <Footer />}
    </>
  );
} 