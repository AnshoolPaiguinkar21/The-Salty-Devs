import type { Metadata } from 'next';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import ConditionalLayout from '@/components/ConditionalLayout';
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
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
