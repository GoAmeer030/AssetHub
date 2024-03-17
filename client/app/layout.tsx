'use client';

import Providers from '@/app/providers';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { Inter as FontSans } from 'next/font/google';

import Header from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers
          themeProps={{
            attribute: 'class',
            defaultTheme: 'dark',
          }}
        >
          <Header />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
