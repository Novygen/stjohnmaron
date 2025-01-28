// components/Footer.tsx

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-6 mt-8 text-center">
      <div className="container mx-auto">
        <p>© {new Date().getFullYear()} St John Maron Church</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}
