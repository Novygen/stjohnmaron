// components/Header.tsx
'use client';

import React from 'react';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          St John Maron
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <Link href="/community/request-membership">Join Community</Link>
          <Link href="/community">Community</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          {/* Some hamburger icon... */}
          <span className="material-icons">menu</span>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileNavOpen && (
        <nav className="md:hidden bg-gray-100 py-2">
          <div className="flex flex-col gap-2 px-4">
            <Link
              href="/community/request-membership"
              onClick={() => setMobileNavOpen(false)}
            >
              Join Community
            </Link>
            <Link href="/community" onClick={() => setMobileNavOpen(false)}>
              Community
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
