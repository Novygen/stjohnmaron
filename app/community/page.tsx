// app/community/page.tsx

import React from 'react';
import { Metadata } from 'next';
import { members } from '@/data/members';
import MemberGrid from '@/components/Community/MemberGrid';
import CommunityFilterBar from '@/components/Community/CommunityFilterBar';

/**
 * 1. Metadata Configuration
 *    - Provides SEO-friendly title and description for the Community page.
 */
export const metadata: Metadata = {
  title: 'Our Parish Community - St. John Maron Maronite Catholic Church',
  description:
    'Browse and discover our parishioners by industry and specialization.',
};

/**
 * 2. Force Dynamic Rendering
 *    - Ensures that the page is rendered dynamically to handle asynchronous params.
 */
export const dynamic = 'force-dynamic';

/**
 * 3. Define Props Interface
 *    - Both `params` and `searchParams` are Promises as per Next.js 15+.
 *    - For the `/community` route, `params` is typically empty, but we'll include it for completeness.
 */
interface CommunityPageProps {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ industry?: string; specialization?: string }>;
}

/**
 * 4. The Community Page Component
 *    - An asynchronous server component that awaits `searchParams`.
 *    - Filters members based on selected industry and specialization.
 */
export default async function CommunityPage({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params,
  searchParams,
}: CommunityPageProps) {
  // Await the searchParams Promise to retrieve query parameters
  const resolvedSearchParams = await searchParams;

  // Extract and sanitize `industry` and `specialization` from searchParams
  const industry =
    typeof resolvedSearchParams.industry === 'string'
      ? resolvedSearchParams.industry
      : '';
  const specialization =
    typeof resolvedSearchParams.specialization === 'string'
      ? resolvedSearchParams.specialization
      : '';

  // Filter the members array based on selected criteria
  const filteredMembers = members.filter((member) => {
    let matchesIndustry = true;
    let matchesSpecialization = true;

    if (industry) {
      matchesIndustry = member.industry === industry;
    }

    if (specialization) {
      matchesSpecialization = member.specialization === specialization;
    }

    return matchesIndustry && matchesSpecialization;
  });

  return (
    <section
      className="py-10 px-4 bg-gray-50 min-h-screen"
      aria-labelledby="community-heading"
    >
      <header className="max-w-5xl mx-auto text-center mb-6">
        <h1
          id="community-heading"
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          Our Parish Community
        </h1>
        <p className="text-lg text-gray-700">
          Meet our diverse members and discover their professions, passions, and
          more.
        </p>
      </header>

      {/* Community Filter Bar */}
      <CommunityFilterBar
        defaultIndustry={industry}
        defaultSpecialization={specialization}
      />

      {/* Member Grid */}
      <MemberGrid members={filteredMembers} />
    </section>
  );
}
