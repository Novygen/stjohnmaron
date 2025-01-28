// app/layout.tsx
import React from 'react';
import Link from 'next/link';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'St John Maron Maronite Catholic Church',
  description: 'Official website for St John Maron Maronite Catholic Church',
};

/**
 * The RootLayout provides the common site header, footer, and shared styling.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[var(--color-background)] text-[var(--color-text)]">
        {/* Header / Navbar */}
        <header className="w-full h-16 flex items-center justify-between px-4 sm:px-8 bg-[var(--color-header-bg)] text-[var(--color-header-text)]">
          <h1 className="text-xl font-semibold">
            St John Maron Maronite Catholic Church
          </h1>
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link className="hover:underline" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/#mass-times">
                  Mass Times
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/#contact">
                  Contact
                </Link>
              </li>
              {/* Add additional nav links if needed */}
            </ul>
          </nav>
        </header>

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="mt-8 bg-[var(--color-header-bg)] text-[var(--color-header-text)] py-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} St John Maron Parish
          </p>
          <p className="text-sm">
            45 Inwood Place, Rochester, NY 14620 | (585) 473-2362
          </p>
        </footer>
      </body>
    </html>
  );
}
