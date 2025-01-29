// app/community/[memberId]/page.tsx

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { members } from '@/data/members';

// 1) This forces Next.js to treat the route as dynamic (no static generation)
//    so you can safely read dynamic params.
export const dynamic = 'force-dynamic';

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

// 3) Page component reading params synchronously (no `await params`)
export default function MemberDetailPage({
  params,
}: {
  params: { memberId: string };
}) {
  const memberIdInt = parseInt(params.memberId, 10);
  const member = members.find((m) => m.id === memberIdInt);

  if (!member) {
    notFound(); // triggers a 404
  }

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
