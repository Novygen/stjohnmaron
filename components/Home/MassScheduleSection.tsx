// components/Home/MassScheduleSection.tsx

import React from 'react';

export default function MassScheduleSection() {
  return (
    <section
      className="py-10 px-4 bg-white text-gray-800"
      id="mass-schedule"
      aria-labelledby="mass-schedule-heading"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          id="mass-schedule-heading"
          className="text-2xl md:text-3xl font-bold mb-4 text-center"
        >
          Join Us for Worship
        </h2>
        <p className="mb-6 text-lg text-center max-w-2xl mx-auto">
          We welcome you to celebrate with us in the sacred Maronite liturgy,
          rich in tradition and centered on the Eucharist.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
          <ul className="space-y-2">
            <li>
              <strong>Saturday Vigil:</strong> 5:00 PM
            </li>
            <li>
              <strong>Sunday Liturgy (English):</strong> 9:00 AM
            </li>
            <li>
              <strong>Sunday Liturgy (Bilingual):</strong> 11:00 AM
            </li>
          </ul>
          <ul className="space-y-2">
            <li>
              <strong>Weekday Masses (Tue-Fri):</strong> 8:00 AM
            </li>
            <li>
              <strong>Holy Days:</strong> Check our online calendar
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
