// app/layout.tsx
import './globals.css';

import React from 'react';

import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'St. John Maron Maronite Catholic Church',
  description:
    'Official website for St. John Maron Maronite Catholic Church – Where Faith, Tradition, and Community Come Together.',
  icons: { icon: '/favicon.ico' },
  // You can add more SEO-friendly fields here (open graph, twitter, etc.)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
