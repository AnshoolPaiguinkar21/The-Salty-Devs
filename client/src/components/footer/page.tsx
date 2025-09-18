import React from 'react';
import { Logo, LogoText } from '@/components/ui/logo';

interface FooterProps {
  logo?: {
    url: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  copyright?: string;
}

const Footer = ({
  logo = {
    alt: 'The Salty Devs',
    title: 'The Salty Devs',
    url: '/',
  },
  tagline = 'Sharing knowledge, one post at a time.',
  copyright = `© ${new Date().getFullYear()} The Salty Devs. All rights reserved.`,
}: FooterProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <footer>
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2">
                <Logo url={logo.url}>
                  <LogoText className="text-lg">{logo.title}</LogoText>
                </Logo>
              </div>
              <p className="mt-2 text-muted-foreground">{tagline}</p>
            </div>
            <div className="border-t pt-6 w-full">
              <p className="text-sm text-muted-foreground">{copyright}</p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
