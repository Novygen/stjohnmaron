'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Industry {
  _id: string;
  name: string;
  // additional fields can be added if needed
}

interface Specialization {
  _id: string;
  name: string;
  industry: string; // this references the industry _id
  // additional fields can be added if needed
}

export default function DiscoverCommunitySection() {
  const router = useRouter();

  // State for fetched data
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [availableSpecializations, setAvailableSpecializations] = useState<
    Specialization[]
  >([]);

  // State for selected dropdown values
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<string>('');

  // Fetch industries on component mount
  useEffect(() => {
    async function fetchIndustries() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/community/industries`,
        );
        if (!res.ok) {
          console.error('Failed to fetch industries');
          return;
        }
        const data = await res.json();
        setIndustries(data);
      } catch (err) {
        console.error('Error fetching industries:', err);
      }
    }
    fetchIndustries();
  }, []);

  // Fetch specializations when selectedIndustry changes
  useEffect(() => {
    async function fetchSpecializations() {
      if (!selectedIndustry) {
        setAvailableSpecializations([]);
        setSelectedSpecialization('');
        return;
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/community/specializations?industryId=${selectedIndustry}`,
        );
        if (!res.ok) {
          console.error('Failed to fetch specializations');
          return;
        }
        const data = await res.json();
        setAvailableSpecializations(data);
      } catch (err) {
        console.error('Error fetching specializations:', err);
      }
    }
    fetchSpecializations();
  }, [selectedIndustry]);

  // Handler for exploring community members
  const handleExplore = () => {
    let url = '/community';
    const params = new URLSearchParams();

    if (selectedIndustry) params.set('industry', selectedIndustry);
    if (selectedSpecialization)
      params.set('specialization', selectedSpecialization);

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
              <option key={ind._id} value={ind._id}>
                {ind.name}
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
              <option key={spec._id} value={spec._id}>
                {spec.name}
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
