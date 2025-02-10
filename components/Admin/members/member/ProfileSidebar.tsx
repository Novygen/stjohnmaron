import React from 'react';
import { Member } from '@/data/member';
import Image from 'next/image';

interface ProfileSidebarProps {
  member: Member;
}

export default function ProfileSidebar({ member }: ProfileSidebarProps) {
  return (
    <div className="w-full lg:w-[300px] bg-white shadow rounded-lg p-6">
      <div className="flex flex-col items-center text-center">
        <Image
          src={member.photoUrl || '/profile.avif'}
          alt={member.fullName}
          width={80}
          height={80}
          className="rounded-full border"
        />
        <h2 className="mt-3 text-lg font-semibold">{member.fullName}</h2>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-600">Contact Info</h3>
          <div className="mt-2 space-y-2">
            <p className="text-gray-700">
              <strong>Email:</strong> {member.email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {member.phoneNumber || 'N/A'}
            </p>
            <p className="text-gray-700">
              <strong>LinkedIn:</strong> {member.linkedIn || 'N/A'}
            </p>
            <p className="text-gray-700">
              <strong>Website:</strong> {member.personalWebsite || 'N/A'}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600">Other Info</h3>
          <p className="text-gray-700">
            <strong>Location:</strong> New York, USA
          </p>
          <p className="text-gray-700">
            <strong>Birthday:</strong> May 19, 1996
          </p>
        </div>
      </div>
    </div>
  );
}
