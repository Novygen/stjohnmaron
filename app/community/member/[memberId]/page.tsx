import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type AsyncParams = Promise<{ memberId: string }>;

export async function generateMetadata({
  params,
}: {
  params: AsyncParams;
}): Promise<Metadata> {
  const { memberId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/public/members/${memberId}`,
    { next: { revalidate: 0 } },
  );
  if (!res.ok) {
    return {
      title: 'Member Not Found – St. John Maron',
      description: 'This member does not exist in our community.',
    };
  }
  const json = await res.json();
  const member = json.data;
  const fullName = `${member.personalDetails.firstName} ${member.personalDetails.lastName}`;
  return {
    title: `St. John Maron – ${fullName}`,
    description: `${fullName} is a valued member of our parish community.`,
  };
}

interface MemberDetailPageProps {
  params: AsyncParams;
}

export default async function MemberDetailPage({
  params,
}: MemberDetailPageProps) {
  const { memberId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/public/members/${memberId}`,
    { next: { revalidate: 0 } },
  );
  if (!res.ok) {
    notFound();
  }
  const json = await res.json();
  const member = json.data;

  // Compute full name and format dates
  const fullName = `${member.personalDetails.firstName} ${member.personalDetails.lastName}`;
  const createdAt = new Date(member.createdAt).toLocaleString();
  const updatedAt = member.updatedAt
    ? new Date(member.updatedAt).toLocaleString()
    : 'N/A';

  return (
    <section className="py-10 px-4 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-left">
          <a
            href="/community"
            className="my-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            aria-label="Return to community listing"
          >
            &larr; Back to Community
          </a>
          <h1 className="text-4xl font-bold mb-2">{fullName}</h1>
          <p className="text-lg text-gray-600">Member Detail</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <img
                src={member.photoUrl || '/images/members/avatar.jpg'}
                alt={`Photo of ${fullName}`}
                className="w-48 h-48 object-cover rounded-full mx-auto"
              />
              <h2 className="mt-4 text-xl font-semibold">{fullName}</h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">
                Contact Information
              </h3>
              <p>
                <strong>Email:</strong> {member.contactInformation.primaryEmail}
              </p>
              {member.privacyConsent.displayPhonePublicly && (
                <p>
                  <strong>Phone:</strong>{' '}
                  {member.contactInformation.primaryPhoneNumber}
                </p>
              )}
              {member.socialPresence.personalWebsite && (
                <p>
                  <strong>Website:</strong>{' '}
                  <a
                    href={member.socialPresence.personalWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {member.socialPresence.personalWebsite}
                  </a>
                </p>
              )}
              {member.socialPresence.linkedInProfile && (
                <p>
                  <strong>LinkedIn:</strong>{' '}
                  <a
                    href={member.socialPresence.linkedInProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {member.socialPresence.linkedInProfile}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Personal Details */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-2xl font-bold mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DisabledInput
                  label="First Name"
                  value={member.personalDetails.firstName}
                />
                <DisabledInput
                  label="Last Name"
                  value={member.personalDetails.lastName}
                />
                {member.personalDetails.middleName && (
                  <DisabledInput
                    label="Middle Name"
                    value={member.personalDetails.middleName}
                  />
                )}
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-2xl font-bold mb-4">
                Professional Information
              </h3>
              {/* Employment Details */}
              {member.professionalInfo.employmentDetails &&
              member.professionalInfo.employmentDetails.length > 0 ? (
                <div className="space-y-4">
                  {member.professionalInfo.employmentDetails.map(
                    (emp: any, idx: number) => (
                      <div key={idx} className="p-4 border rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <DisabledInput
                            label="Company Name"
                            value={emp.companyName}
                          />
                          <DisabledInput
                            label="Job Title"
                            value={emp.jobTitle}
                          />
                          <DisabledInput
                            label="Specialization"
                            value={
                              typeof emp.specialization === 'object'
                                ? emp.specialization.name || ''
                                : emp.specialization.toString()
                            }
                          />
                          <DisabledInput
                            label="Start Date"
                            value={emp.startDate}
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <p className="text-gray-700">
                  No employment details available.
                </p>
              )}

              {/* Business Information */}
              {member.professionalInfo.ownsBusinessOrService &&
                member.professionalInfo.businesses &&
                member.professionalInfo.businesses.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-xl font-bold mb-2">
                      Business Information
                    </h4>
                    {member.professionalInfo.businesses.map(
                      (biz: any, idx: number) => (
                        <div key={idx} className="p-4 border rounded-md">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DisabledInput
                              label="Business Name"
                              value={biz.businessName}
                            />
                            <DisabledInput
                              label="Additional Info"
                              value={biz.additionalInformation}
                            />
                            <DisabledInput
                              label="Website"
                              value={biz.website}
                            />
                            <DisabledInput
                              label="Phone"
                              value={biz.phoneNumber}
                            />
                            <DisabledInput
                              label="Industry"
                              value={
                                typeof biz.industry === 'object'
                                  ? biz.industry.name || ''
                                  : biz.industry.toString()
                              }
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                )}
            </div>

            {/* Social Presence */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-2xl font-bold mb-4">Social Presence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DisabledInput
                  label="Personal Website"
                  value={member.socialPresence.personalWebsite || 'N/A'}
                />
                <DisabledInput
                  label="LinkedIn Profile"
                  value={member.socialPresence.linkedInProfile || 'N/A'}
                />
                <DisabledInput
                  label="Facebook Profile"
                  value={member.socialPresence.facebookProfile || 'N/A'}
                />
                <DisabledInput
                  label="Instagram Handle"
                  value={member.socialPresence.instagramHandle || 'N/A'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper component to render a disabled input with label
function DisabledInput({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        disabled
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
