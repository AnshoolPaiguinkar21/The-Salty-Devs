import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
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
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
