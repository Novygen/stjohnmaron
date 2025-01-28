// components/Home/LocationContactSection.tsx

import React from 'react';

export default function LocationContactSection() {
  return (
    <section className="py-10 px-4 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Come Visit Us
        </h2>
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-8">
          {/* Contact Info */}
          <div>
            <p className="text-lg mb-1 font-semibold">
              St. John Maron Maronite Catholic Church
            </p>
            <p className="mb-2">1234 Maronite Way</p>
            <p className="mb-2">City, State, ZIP</p>
            <p className="mb-2">Phone: (123) 456-7890</p>
            <p className="mb-4">Email: info@stjohnmaron.org</p>
            <p className="text-sm text-gray-700">
              Office Hours: Tue–Fri, 9:00 AM–5:00 PM
            </p>
          </div>

          {/* Embedded Map (if desired) */}
          <div className="w-full md:w-1/2 h-64 bg-gray-200">
            {/* Replace with a real Google Maps embed or iframe if you like: */}
            <iframe
              title="St. John Maron Church Location"
              src="https://www.google.com/maps/embed?...your-map-key..."
              width="100%"
              height="100%"
              className="border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
