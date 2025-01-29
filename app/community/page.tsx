// app/community/page.tsx

import React from 'react';
import { Metadata } from 'next';
import { members } from '@/data/members';
import MemberGrid from '@/components/Community/MemberGrid';
import CommunityFilterBar from '@/components/Community/CommunityFilterBar';

export const metadata: Metadata = {
  title: 'St. John Maron – Our Parish Community',
  description:
    'Browse and discover our parishioners by industry and specialization',
};

// Declare the route as dynamic so Next.js doesn't try to statically render it
export const dynamic = 'force-dynamic';

interface CommunityPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// Marking the function async is optional if you don't actually await anything,
// but it's allowed. The crucial part is `export const dynamic = 'force-dynamic';`
export default async function CommunityPage({
  searchParams,
}: CommunityPageProps) {
  // Extract query params from the searchParams object
  const { industry, specialization } = await searchParams;

  // Filter logic
  const filteredMembers = members.filter((m) => {
    let match = true;
    if (industry && m.industry !== industry) match = false;
    if (specialization && m.specialization !== specialization) match = false;
    return match;
  });

  return (
    <section className="py-10 px-4 bg-gray-50 min-h-screen">
      <header className="max-w-5xl mx-auto text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Our Parish Community
        </h1>
        <p className="text-lg text-gray-700">
          Meet our diverse members and discover their professions, passions, and
          more.
        </p>
      </header>

      {/* Optional: filter bar for re-filtering */}
      <CommunityFilterBar
        defaultIndustry={industry}
        defaultSpecialization={specialization}
      />

      <MemberGrid members={filteredMembers} />
    </section>
  );
}
