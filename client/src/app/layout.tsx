import type { Metadata } from 'next';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import ConditionalLayout from '@/components/ConditionalLayout';
import { AuthProvider } from '@/contexts/AuthContext';
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
          <AuthProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
