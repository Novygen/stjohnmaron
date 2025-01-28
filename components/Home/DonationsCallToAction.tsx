// components/Home/DonationsCallToAction.tsx

import React from 'react';

export default function DonationsCallToAction() {
  return (
    <section className="py-10 bg-[url('/images/donation-bg.jpg')] bg-cover bg-center text-white text-center">
      <div className="bg-black bg-opacity-50 px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Support Our Church
        </h2>
        <p className="max-w-xl mx-auto mb-6">
          Your generous donations help us continue our ministries, community
          outreach, and upkeep of our parish.
        </p>
        <a
          href="#donate"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded"
        >
          Donate Now
        </a>
      </div>
    </section>
  );
}
