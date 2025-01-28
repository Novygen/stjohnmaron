// components/Home/AnnouncementsSection.tsx

import React from 'react';

import Link from 'next/link';

export default function AnnouncementsSection() {
  // Example upcoming events
  const events = [
    {
      title: 'Lenten Mission & Reflection Series',
      dateTime: 'Every Wednesday at 7:00 PM throughout Lent',
      description:
        'Deepen your spiritual life with weekly reflections and discussions.',
    },
    {
      title: 'Annual Parish Festival',
      dateTime: 'September 10, 10:00 AM–6:00 PM',
      description:
        'Enjoy a day of food, music, and cultural celebrations with friends and family.',
    },
    {
      title: 'Bible Study Group',
      dateTime: 'Thursdays at 7:30 PM',
      description:
        'Join fellow parishioners in a guided study of Sacred Scripture.',
    },
  ];

  return (
    <section className="py-10 px-4 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Stay Up to Date
        </h2>
        <p className="text-lg text-center mb-6 max-w-xl mx-auto">
          Explore upcoming events and stay informed about all parish activities,
          community gatherings, and important announcements.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded p-4 text-center"
              aria-label={`Event: ${event.title}`}
            >
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{event.dateTime}</p>
              <p className="text-sm text-gray-700">{event.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/calendar"
            className="inline-block bg-yellow-400 text-gray-900 px-5 py-2 font-semibold rounded hover:bg-yellow-500"
          >
            See Full Calendar
          </Link>
        </div>
      </div>
    </section>
  );
}
