// components/Home/SupportGivingSection.tsx

import React from 'react';

import Link from 'next/link';

export default function SupportGivingSection() {
  return (
    <section className="py-10 px-4 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Support Our Mission
        </h2>
        <p className="mb-6 text-lg max-w-2xl mx-auto">
          Your generosity helps us maintain our beautiful church, support our
          programs, and expand our charitable outreach.
        </p>

        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-8">
          <div>
            <h3 className="font-semibold">Online Giving</h3>
            <p className="text-sm text-gray-700">
              Secure online donations and one-time gifts.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Weekly Envelopes</h3>
            <p className="text-sm text-gray-700">
              Traditional envelopes for weekly Mass offertory.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Planned Giving</h3>
            <p className="text-sm text-gray-700">
              Estate planning and legacy gifts.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Special Collections</h3>
            <p className="text-sm text-gray-700">
              Seasonal drives and campaigns for specific causes.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/donate"
            className="inline-block bg-yellow-400 text-gray-900 px-5 py-2 font-semibold rounded hover:bg-yellow-500"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </section>
  );
}
