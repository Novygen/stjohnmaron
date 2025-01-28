// components/Home/PastorsMessageSection.tsx

import React from 'react';

export default function PastorsMessageSection() {
  return (
    <section className="py-10 px-4 bg-white text-gray-800" id="about-parish">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          A Message from Our Pastor
        </h2>
        <p className="mb-4 text-lg leading-relaxed">
          Welcome to St. John Maron Maronite Catholic Church! We are a faithful
          community rooted in the Maronite tradition, united in our devotion to
          Jesus Christ, and guided by the Holy Spirit. Whether you are a
          lifelong parishioner or visiting for the first time, we invite you to
          experience our liturgies, participate in our ministries, and grow in
          fellowship with us. We look forward to walking alongside you on your
          faith journey.
        </p>
        <p className="text-right font-semibold italic">
          — Rev. [Pastor’s Name]
        </p>
      </div>
    </section>
  );
}
