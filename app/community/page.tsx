import React from 'react';
import { Metadata } from 'next';
import MemberGrid from '@/components/Community/MemberGrid';
import CommunityFilterBar from '@/components/Community/CommunityFilterBar';

export const metadata: Metadata = {
  title: 'Our Parish Community - St. John Maron Maronite Catholic Church',
  description:
    'Browse and discover our parishioners by industry and specialization.',
};

export const dynamic = 'force-dynamic';

interface CommunityPageProps {
  params?: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ industry?: string; specialization?: string }>;
}

export default async function CommunityPage({
  searchParams,
}: CommunityPageProps) {
  // Resolve query parameters for filtering
  const resolvedSearchParams = await searchParams;
  const industry =
    typeof resolvedSearchParams.industry === 'string'
      ? resolvedSearchParams.industry
      : '';
  const specialization =
    typeof resolvedSearchParams.specialization === 'string'
      ? resolvedSearchParams.specialization
      : '';

  // Fetch members from API
  const membersRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/members?limit=100`,
    { next: { revalidate: 0 } },
  );
  console.log('Members Response:', membersRes);
  if (!membersRes.ok) {
    throw new Error('Failed to fetch members');
  }
  const membersJson = await membersRes.json();
  const members = membersJson.data;

  // Filter members based on the query parameters (matching by ID)
  const filteredMembers = members.filter((member: any) => {
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

  // Fetch industries from API (returns an array of objects with _id and name)
  const industriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/community/industries`,
    { next: { revalidate: 0 } },
  );
  if (!industriesRes.ok) {
    throw new Error('Failed to fetch industries');
  }
  const industries = await industriesRes.json();

  // Fetch specializations from API.
  // If an industry is selected, filter specializations server-side by passing its ID.
  const specializationsUrl = industry
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/community/specializations?industryId=${industry}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/community/specializations`;
  const specializationsRes = await fetch(specializationsUrl, {
    next: { revalidate: 0 },
  });
  if (!specializationsRes.ok) {
    throw new Error('Failed to fetch specializations');
  }
  const specializations = await specializationsRes.json();

  console.log('Members Data:', members);
  console.log('Industries Data:', industries);
  console.log('Specializations Data:', specializations);

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

      <CommunityFilterBar
        defaultIndustry={industry}
        defaultSpecialization={specialization}
        industries={industries}
        specializations={specializations}
      />

      <MemberGrid members={filteredMembers} />
    </section>
  );
}
