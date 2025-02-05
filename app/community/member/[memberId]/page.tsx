import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type AsyncParams = Promise<{ memberId: string }>;

/**
 * Generate metadata dynamically by fetching the member details.
 */
export async function generateMetadata({
  params,
}: {
  params: AsyncParams;
}): Promise<Metadata> {
  const { memberId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/members/${memberId}`,
    { next: { revalidate: 0 } },
  );
  if (!res.ok) {
    return {
      title: 'Member Not Found – St. John Maron',
      description: 'This member does not exist in our community.',
    };
  }
  const member = await res.json();

  return {
    title: `St. John Maron – ${member.fullName}`,
    description: `${member.fullName} is part of our parish community in ${member.industry?.name} (${member.specialization?.name}).`,
  };
}

interface MemberDetailPageProps {
  params: AsyncParams;
}

/**
 * The page component fetches and displays the member details.
 */
export default async function MemberDetailPage({
  params,
}: MemberDetailPageProps) {
  const { memberId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/v1/members/${memberId}`,
    { next: { revalidate: 0 } },
  );
  if (!res.ok) {
    notFound();
  }
  const member = await res.json();

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

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Member Photo */}
          <div className="flex-shrink-0">
            <img
              src={member.photoUrl || '/images/members/avatar.jpg'}
              alt={`Photo of ${member.fullName}`}
              className="w-48 h-48 object-cover rounded"
            />
          </div>

          {/* Member Details */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-4">{member.fullName}</h1>

            <div className="mb-4 space-y-1">
              {member.businessName && (
                <p>
                  <strong>Business Name:</strong> {member.businessName}
                </p>
              )}
              <p>
                <strong>Industry:</strong> {member.industry?.name}
              </p>
              <p>
                <strong>Specialization:</strong> {member.specialization?.name}
              </p>
              {member.jobTitle && (
                <p>
                  <strong>Job Title:</strong> {member.jobTitle}
                </p>
              )}
              {member.organization && (
                <p>
                  <strong>Organization:</strong> {member.organization}
                </p>
              )}
            </div>

            {/* Contact Details */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                Contact Information
              </h2>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href={`mailto:${member.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {member.email}
                </a>
              </p>
              <p>
                <strong>Phone Number:</strong>{' '}
                {member.phoneNumber || '123-456-7890'}
              </p>
              {member.personalWebsite && (
                <p>
                  <strong>Website:</strong>{' '}
                  <a
                    href={member.personalWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {member.personalWebsite}
                  </a>
                </p>
              )}
              {member.linkedIn && (
                <p>
                  <strong>LinkedIn:</strong>{' '}
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {member.linkedIn}
                  </a>
                </p>
              )}
            </div>

            {/* Biography */}
            {member.shortBio && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Biography</h2>
                <p className="text-sm leading-relaxed">{member.shortBio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
