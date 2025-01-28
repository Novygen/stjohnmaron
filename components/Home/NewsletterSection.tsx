// components/Home/NewsletterSection.tsx
'use client';

import React, { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send 'email' to your newsletter API or service
    alert(`Thank you for subscribing, ${email}!`);
    setEmail('');
  };

  return (
    <section className="py-10 px-4 bg-gray-100 text-gray-800">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Connected</h2>
        <p className="text-lg mb-6">
          Sign up for our parish newsletter to receive the latest updates,
          announcements, and spiritual reflections right in your inbox.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-auto flex-1 px-4 py-2 border border-gray-300 rounded"
            aria-label="Email Address"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded hover:bg-yellow-500"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
