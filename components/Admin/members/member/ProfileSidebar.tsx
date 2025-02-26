'use client';

import React from 'react';
import Image from 'next/image';
import { Member } from '@/data/members';

interface ProfileSidebarProps {
  member: Member;
}

export default function ProfileSidebar({ member }: ProfileSidebarProps) {
  const fullName = `${member.personalDetails.firstName} ${member.personalDetails.lastName}`;
  const email = member.contactInformation.primaryEmail;
  const phone = member.contactInformation.primaryPhoneNumber;
  const linkedIn = member.socialPresence.linkedInProfile;
  const website = member.socialPresence.personalWebsite;
  return (
    <div className="w-full lg:w-[300px] bg-white shadow rounded-lg p-6">
      <div className="flex flex-col items-center text-center">
        <Image
          src={(member as any).photoUrl || '/profile.avif'}
          alt={fullName}
          width={80}
          height={80}
          className="rounded-full border"
        />
        <h2 className="mt-3 text-lg font-semibold">{fullName}</h2>
      </div>
      <div className="mt-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-600">Contact Info</h3>
          <div className="mt-2 space-y-2">
            <p className="text-gray-700">
              <strong>Email:</strong> {email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {phone || 'N/A'}
            </p>
            <p className="text-gray-700">
              <strong>LinkedIn:</strong> {linkedIn || 'N/A'}
            </p>
            <p className="text-gray-700">
              <strong>Website:</strong> {website || 'N/A'}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600">Other Info</h3>
          <p className="text-gray-700">
            <strong>Location:</strong> {member.contactInformation.address.city},{' '}
            {member.contactInformation.address.country}
          </p>
          <p className="text-gray-700">
            <strong>Age Range:</strong> {member.personalDetails.ageRange}
          </p>
        </div>
      </div>
    </div>
  );
}
