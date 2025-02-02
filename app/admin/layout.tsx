// app/community/layout.tsx

import React from 'react';

import type { Metadata } from 'next';
import Header from '@/components/Admin/Header';

export const metadata: Metadata = {
  title: 'Admin Portal - St. John Maron Maronite Catholic Church',
  icons: { icon: '/favicon.ico' },
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
      </body>
    </html>
  );
}
