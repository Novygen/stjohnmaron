import React from 'react';
import { Member } from '@/data/member';
import QuickActions from '@/components/Admin/members/QuickActions';
import StatusBadge from '@/components/Admin/members/StatusBadge';
import Image from 'next/image';

interface MemberRowProps {
  member: Member;
  onEdit: () => void;
  onStatus: () => void;
  onView: () => void;
}

export default function MemberRow({
  member,
  onEdit,
  onStatus,
  onView,
}: MemberRowProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-3 px-4 bg-blue-50 hover:bg-gray-100 transition-all rounded-lg mb-3 drop-shadow-sm z-10 hover:drop-shadow-md hover:z-10">
      <div className="flex items-center gap-4 mb-3 md:mb-0">
        <Image
          src={member.photoUrl || '/profile.avif'}
          alt={member.fullName}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h3 className="font-medium text-gray-900">{member.fullName}</h3>
          <p className="text-sm text-gray-500">{member.email}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Birthday:</span> {member.yearOfBirth}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Industry:</span>{' '}
          {member.industry.name}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Position:</span>{' '}
          {member.jobTitle || 'N/A'}
        </p>
        <StatusBadge isVisible={!!member.fullName} />
        <QuickActions onEdit={onEdit} onStatus={onStatus} onView={onView} />
      </div>
    </div>
  );
}
