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
  const industryFilter =
    typeof resolvedSearchParams.industry === 'string'
      ? resolvedSearchParams.industry
      : '';
  const specializationFilter =
    typeof resolvedSearchParams.specialization === 'string'
      ? resolvedSearchParams.specialization
      : '';

  // Fetch members from the public API
  const membersRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/public/members`,
    { next: { revalidate: 0 } },
  );
  if (!membersRes.ok) {
    throw new Error('Failed to fetch members');
  }
  const membersJson = await membersRes.json();
  const members = membersJson.data;

  // Filter members based on nested professionalInfo.
  // For industry, use the first business's industry _id.
  // For specialization, use the first employment detail's specialization _id.
  const filteredMembers = members.filter((member: any) => {
    const business = member.professionalInfo?.businesses?.[0];
    const memberIndustryId = business
      ? typeof business.industry === 'object'
        ? business.industry._id
        : business.industry
      : '';
    const employment = member.professionalInfo?.employmentDetails?.[0];
    const memberSpecializationId = employment
      ? typeof employment.specialization === 'object'
        ? employment.specialization._id
        : employment.specialization
      : '';

    let matchesIndustry = industryFilter
      ? memberIndustryId === industryFilter
      : true;
    let matchesSpecialization = specializationFilter
      ? memberSpecializationId === specializationFilter
      : true;
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
  const specializationsUrl = industryFilter
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/community/specializations?industryId=${industryFilter}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/community/specializations`;
  const specializationsRes = await fetch(specializationsUrl, {
    next: { revalidate: 0 },
  });
  if (!specializationsRes.ok) {
    throw new Error('Failed to fetch specializations');
  }
  const specializations = await specializationsRes.json();

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
        defaultIndustry={industryFilter}
        defaultSpecialization={specializationFilter}
        industries={industries}
        specializations={specializations}
      />

      <MemberGrid members={filteredMembers} />
    </section>
  );
}
