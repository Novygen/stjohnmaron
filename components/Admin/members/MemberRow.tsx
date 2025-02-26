'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import QuickActions from '@/components/Admin/members/QuickActions';
import StatusBadge from '@/components/Admin/members/StatusBadge';
import { Member } from '@/data/members';

interface MemberRowProps {
  member: Member;
  onView: () => void;
}

function computeEmploymentStatus(member: Member): string {
  const prof = member.professionalInfo;
  const statuses: string[] = [];

  if (prof.employmentDetails && prof.employmentDetails.length > 0) {
    statuses.push('Employed');
  }
  if (prof.ownsBusinessOrService) {
    statuses.push('Business Owner/Service Provider');
  }
  if (prof.student && prof.student.length > 0) {
    statuses.push('Student');
  }

  if (statuses.length === 0) {
    return 'Unemployed/Retired';
  }

  return statuses.join(' & ');
}

export default function MemberRow({ member, onView }: MemberRowProps) {
  const fullName = `${member.personalDetails.firstName} ${member.personalDetails.lastName}`;
  const email = member.contactInformation.primaryEmail;
  const empStatus = computeEmploymentStatus(member);

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row items-center justify-between py-3 px-4 bg-blue-50 hover:bg-gray-100 transition-all rounded-lg mb-3 drop-shadow-sm z-10 hover:drop-shadow-md hover:z-10 relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-2 right-2 md:hidden">
        <span
          className={`inline-block w-3 h-3 rounded-full ${
            fullName ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></span>
      </div>
      <div className="flex items-center gap-4 mb-3 md:mb-0 w-full md:w-auto">
        <Image
          src={(member as any).photoUrl || '/profile.avif'}
          alt={fullName}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{fullName}</h3>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:flex md:flex-row items-start md:items-center gap-2 md:gap-6 w-full md:w-auto">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Employment Status:</span> {empStatus}
        </p>
        <span className="hidden md:block">
          <StatusBadge isVisible={!!fullName} />
        </span>
        <QuickActions onView={onView} />
      </div>
    </motion.div>
  );
}
