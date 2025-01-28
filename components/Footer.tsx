// components/Footer.tsx

import React from 'react';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <p className="text-sm">
            © {new Date().getFullYear()} St. John Maron Maronite Catholic
            Church. All rights reserved.
          </p>
          <p className="text-xs">
            Proudly part of the Maronite Eparchy of [Region]
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="/do-not-sell" className="hover:underline">
            Do Not Sell My Personal Information
          </Link>
        </div>
      </div>
    </footer>
  );
}
