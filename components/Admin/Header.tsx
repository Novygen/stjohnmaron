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
        <Link href="/admin" className="text-xl font-bold text-gray-900">
          St John Maron
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <Link href="/admin/requests">Requests</Link>
          <Link href="/admin/members">Members</Link>
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
              href="/admin/requests"
              onClick={() => setMobileNavOpen(false)}
            >
              Requests
            </Link>
            <Link href="/admin/members" onClick={() => setMobileNavOpen(false)}>
              Members
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
