// components/Home/UpcomingEventsSection.tsx

import React from 'react';

export default function UpcomingEventsSection() {
  // In a real app, you might fetch events data from an API or CMS
  const events = [
    {
      title: 'Youth Gathering',
      date: 'April 20',
      description: 'Teens meet for prayer, discussion, and pizza night!',
    },
    {
      title: 'Community Breakfast',
      date: 'April 25',
      description: 'All are invited to a free breakfast after morning Mass.',
    },
    {
      title: 'Food Drive',
      date: 'May 1',
      description: 'Collecting canned goods for local shelters.',
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Upcoming Events
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="bg-white rounded shadow p-6 text-center flex-1"
            >
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-600 mb-2">{event.date}</p>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
