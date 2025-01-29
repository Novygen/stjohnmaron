// components/Home/DiscoverCommunitySection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { industries, industrySpecializations } from '@/data/members';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function DiscoverCommunitySection() {
  const router = useRouter();

  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<string>('');
  const [availableSpecializations, setAvailableSpecializations] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (selectedIndustry && industrySpecializations[selectedIndustry]) {
      setAvailableSpecializations(industrySpecializations[selectedIndustry]);
    } else {
      setAvailableSpecializations([]);
      setSelectedSpecialization('');
    }
  }, [selectedIndustry]);

  const handleExplore = () => {
    // Build query params
    let url = '/community';
    const params = new URLSearchParams();

    if (selectedIndustry) {
      params.set('industry', selectedIndustry);
    }
    if (selectedSpecialization) {
      params.set('specialization', selectedSpecialization);
    }

    // If any params are set, append them
    if ([...params.keys()].length > 0) {
      url += `?${params.toString()}`;
    }

    router.push(url);
  };

  return (
    <motion.section
      className="py-10 px-4 bg-white text-gray-800"
      aria-label="Discover our community"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }} // Animate once when in view
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Discover Our Community
        </h2>
        <p className="max-w-xl mx-auto mb-6 text-lg">
          Explore the diverse backgrounds, professions, and passions of our
          parishioners. Connect, learn, and grow together.
        </p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-center">
        {/* Industry Dropdown */}
        <div className="w-full sm:w-1/2">
          <label
            htmlFor="industry-select"
            className="block mb-1 text-sm font-semibold"
          >
            Industry
          </label>
          <select
            id="industry-select"
            aria-label="Industry selection"
            className="w-full border border-gray-300 rounded p-2"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            <option value="">All Industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Specialization Dropdown */}
        <div className="w-full sm:w-1/2">
          <label
            htmlFor="specialization-select"
            className="block mb-1 text-sm font-semibold"
          >
            Specialization
          </label>
          <select
            id="specialization-select"
            aria-label="Specialization selection"
            className="w-full border border-gray-300 rounded p-2"
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            disabled={!selectedIndustry}
          >
            <option value="">All Specializations</option>
            {availableSpecializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleExplore}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-transform hover:scale-105"
          aria-label="Explore community members"
        >
          Explore
        </button>
      </div>
    </motion.section>
  );
}
