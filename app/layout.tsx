import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/16/solid';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Karrot Market',
    default: 'Karrot Market',
  },
  description: 'Sell and Buy things',
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-neutral-900 text-white max-w-screen-sm mx-auto relative min-h-screen`}
      >
        {children}
        
        
      </body>
    </html>
  );
}
