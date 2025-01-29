/* eslint-disable @typescript-eslint/no-explicit-any */
// app/community/[memberId]/page.tsx

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { members } from '@/data/members';

// 1) Force dynamic so Next.js knows to handle route params at runtime.
export const dynamic = 'force-dynamic';

/**
 * Define the props for this page.
 * Next.js 13 pages automatically receive:
 *   - `params` (dynamic route segments)
 *   - `searchParams` (query strings)
 */
interface MemberDetailPageProps {
  params: {
    memberId: string;
  };
  searchParams?: {
    [key: string]: any;
  };
}

// 2) Generate dynamic metadata (SEO)
export async function generateMetadata({
  params,
}: {
  params: { memberId: string };
}): Promise<Metadata> {
  const memberIdInt = parseInt(params.memberId, 10);
  const member = members.find((m) => m.id === memberIdInt);

  if (!member) {
    return {
      title: 'Member Not Found – St. John Maron',
      description: 'This member does not exist in our community.',
    };
  }

  return {
    title: `St. John Maron – ${member.name}`,
    description: `${member.name} is part of our parish community in ${member.industry} (${member.specialization}).`,
  };
}

/**
 * 3) The Page Component
 *    - Marked as a *regular* function returning JSX (no async needed).
 */
export default function MemberDetailPage({ params }: MemberDetailPageProps) {
  // Convert memberId from string to a number
  const memberIdInt = parseInt(params.memberId, 10);

  // Find the member in your data
  const member = members.find((m) => m.id === memberIdInt);

  // If not found, use Next.js notFound() for a 404
  if (!member) {
    notFound();
  }

  // Render the member detail
  return (
    <section
      className="py-10 px-4 bg-white min-h-screen text-gray-800"
      aria-label="Member detail page"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a
            href="/community"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
            aria-label="Return to community listing"
          >
            &larr; Back to Community
          </a>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Photo */}
          {member?.photoUrl && (
            <img
              src={member.photoUrl}
              alt={`Photo of ${member.name}`}
              className="w-48 h-48 object-cover rounded"
            />
          )}

          <div>
            <h1 className="text-3xl font-bold mb-2">{member?.name}</h1>
            <p className="text-lg text-gray-600 mb-4">
              {member?.industry} – {member?.specialization}
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">
              {member?.bio}
            </p>
            {member?.contactEmail && (
              <p className="mt-4 text-sm">
                <strong>Contact:</strong>{' '}
                <a
                  href={`mailto:${member.contactEmail}`}
                  className="text-blue-600 hover:underline"
                >
                  {member.contactEmail}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
