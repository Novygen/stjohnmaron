// components/Community/CommunityFilterBar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { industries, industrySpecializations } from '@/data/members';

interface CommunityFilterBarProps {
  defaultIndustry?: string;
  defaultSpecialization?: string;
}

export default function CommunityFilterBar({
  defaultIndustry,
  defaultSpecialization,
}: CommunityFilterBarProps) {
  const router = useRouter();
  const [industry, setIndustry] = useState(defaultIndustry || '');
  const [specialization, setSpecialization] = useState(
    defaultSpecialization || '',
  );
  const [availableSpecs, setAvailableSpecs] = useState<string[]>([]);

  useEffect(() => {
    if (industry && industrySpecializations[industry]) {
      setAvailableSpecs(industrySpecializations[industry]);
    } else {
      setAvailableSpecs([]);
      setSpecialization('');
    }
  }, [industry]);

  const handleFilter = () => {
    let url = '/community';
    const params = new URLSearchParams();

    if (industry) params.set('industry', industry);
    if (specialization) params.set('specialization', specialization);

    if ([...params.keys()].length > 0) {
      url += `?${params.toString()}`;
    }
    router.push(url);
  };

  return (
    <div
      className="max-w-4xl mx-auto mb-6 p-4 bg-white rounded shadow"
      aria-label="Community filter bar"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="filter-industry"
            className="block mb-1 text-sm font-semibold"
          >
            Industry
          </label>
          <select
            id="filter-industry"
            className="w-full border border-gray-300 rounded p-2"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option value="">All Industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label
            htmlFor="filter-specialization"
            className="block mb-1 text-sm font-semibold"
          >
            Specialization
          </label>
          <select
            id="filter-specialization"
            className="w-full border border-gray-300 rounded p-2"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            disabled={!industry}
          >
            <option value="">All Specializations</option>
            {availableSpecs.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleFilter}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold self-end md:self-center"
          aria-label="Filter community members"
        >
          Filter
        </button>
      </div>
    </div>
  );
}
