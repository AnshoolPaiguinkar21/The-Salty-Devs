import type { Metadata } from 'next';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/header/page';
import Footer from '@/components/footer/page';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'The Salty Devs',
  description: 'The Salty Devs Blog Page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
