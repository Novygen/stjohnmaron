// components/Home/WelcomeSection.tsx

import React from 'react';

export default function WelcomeSection() {
  return (
    <section id="welcome" className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Welcome</h2>
        <p className="max-w-2xl mx-auto mb-6 text-lg">
          We are a vibrant community of believers in Jesus Christ, united by our
          Maronite heritage and dedicated to worship, service, and fellowship.
        </p>
      </div>
    </section>
  );
}
