// components/Home/MissionValuesSection.tsx

import React from 'react';

export default function MissionValuesSection() {
  return (
    <section className="py-10 px-4 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Our Mission &amp; Values
        </h2>
        <p className="mb-4 text-lg">
          At St. John Maron, our mission is to bring people closer to God
          through the teachings of Jesus Christ as celebrated in the Maronite
          Catholic tradition. We strive to:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2 text-lg">
          <li>
            Honor the spiritual and liturgical heritage of the Maronite Church.
          </li>
          <li>Foster a sense of unity, compassion, and mutual respect.</li>
          <li>
            Promote charitable works and service within and beyond our parish.
          </li>
          <li>Encourage lifelong faith formation for all ages.</li>
        </ul>
        <p className="text-lg">
          We draw inspiration from St. John Maron, the first Patriarch of the
          Maronite Church, known for his leadership and unwavering commitment to
          Christ.
        </p>
      </div>
    </section>
  );
}
