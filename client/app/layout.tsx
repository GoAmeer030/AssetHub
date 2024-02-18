'use client';

import '@/styles/globals.css';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Meteors } from '@/components/ui/meteors';

import Providers from '@/app/providers';
import Navbar from '@/components/Navbar';

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
          <div className="relative">
            <Navbar />
            <Toaster />
            {children}

            <div className="absolute top-0 h-full w-full overflow-hidden">
              <Meteors number={20} className="max-w-full" />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
