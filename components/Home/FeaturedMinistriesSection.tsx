// components/Home/FeaturedMinistriesSection.tsx

import React from 'react';

import Link from 'next/link';

export default function FeaturedMinistriesSection() {
  const ministries = [
    {
      title: 'Religious Education (Catechism)',
      description:
        'For children and teens preparing for First Communion, Confirmation, and ongoing faith formation.',
    },
    {
      title: 'Youth & Young Adult Ministry',
      description:
        'Building relationships and faith experiences for the young members of our parish.',
    },
    {
      title: 'Family Life & Marriage Preparation',
      description:
        'Support and resources for couples and families at every stage of life.',
    },
    {
      title: 'Community Outreach & Charity',
      description:
        'Partnering with local organizations to serve the poor, the sick, and the marginalized.',
    },
    {
      title: 'Liturgical Ministry',
      description:
        'Serve as lectors, altar servers, ushers, and Eucharistic ministers.',
    },
  ];

  return (
    <section className="py-10 px-4 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Get Involved
        </h2>
        <p className="text-lg text-center mb-6 max-w-xl mx-auto">
          We have a variety of ministries and programs designed to help you grow
          in faith and service. Learn more and find a place to share your
          talents.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {ministries.map((ministry, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded shadow hover:shadow-md transition"
              aria-label={`Ministry: ${ministry.title}`}
            >
              <h3 className="text-lg font-semibold mb-2">{ministry.title}</h3>
              <p className="text-sm text-gray-700">{ministry.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            href="/ministries"
            className="bg-yellow-400 text-gray-900 px-5 py-2 font-semibold rounded hover:bg-yellow-500"
          >
            Explore All Ministries
          </Link>
          <Link
            href="/volunteer"
            className="bg-gray-200 text-gray-800 px-5 py-2 font-semibold rounded hover:bg-gray-300"
          >
            Volunteer Today
          </Link>
        </div>
      </div>
    </section>
  );
}
