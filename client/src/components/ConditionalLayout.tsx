'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
  const pathname = usePathname();
  
  // Check if the current path is an admin route
  const isAdminRoute = pathname?.startsWith('/admin');

  // For admin routes, render children without main site header/footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For regular routes, render with main site header/footer
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default ConditionalLayout;
