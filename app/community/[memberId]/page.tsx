import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { members } from '@/data/members';

/**
 * 1) Indicate that this route is dynamic so Next.js won't attempt static generation.
 *    This is often necessary when dealing with dynamic or async route data.
 */
export const dynamic = 'force-dynamic';

/**
 * 2) In Next.js 15+ hypothetical scenario:
 *    `params` is a Promise. We'll define a type for it.
 */
type AsyncParams = Promise<{ memberId: string }>;

/**
 * 4) For SEO, we generate metadata asynchronously.
 *    We'll "await" the `params` promise to get the `memberId`.
 */
export async function generateMetadata({
  params,
}: {
  params: AsyncParams;
}): Promise<Metadata> {
  const { memberId } = await params; // <-- Hypothetical usage in Next.js 15
  const memberIdInt = parseInt(memberId, 10);
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
 * 5) Page props interface showing an async `params`.
 */
interface MemberDetailPageProps {
  params: AsyncParams; // hypothetical scenario
}

/**
 * 6) The page component:
 *    - Marked async so we can await `params`.
 *    - If the member is not found, call `notFound()`.
 */
export default async function MemberDetailPage({
  params,
}: MemberDetailPageProps) {
  // Unwrap the promise
  const { memberId } = await params; // <-- new approach in Next.js 15
  const memberIdInt = parseInt(memberId, 10);

  // Load or find the member from a data array
  const member = members.find((m) => m.id === memberIdInt);

  // If no member found, trigger a 404
  if (!member) {
    notFound();
  }

  // Render your dynamic page
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
          {member.photoUrl && (
            <img
              src={member.photoUrl}
              alt={`Photo of ${member.name}`}
              className="w-48 h-48 object-cover rounded"
            />
          )}

          <div>
            <h1 className="text-3xl font-bold mb-2">{member.name}</h1>
            <p className="text-lg text-gray-600 mb-4">
              {member.industry} – {member.specialization}
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">
              {member.bio}
            </p>
            {member.contactEmail && (
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
