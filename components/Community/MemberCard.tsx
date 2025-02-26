'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Member } from '@/data/members';

interface MemberCardProps {
  member: Member;
}

function computeEmploymentStatus(member: Member): string {
  const prof = member.professionalInfo;
  if (prof.employmentDetails && prof.employmentDetails.length > 0) {
    return 'Employed';
  }
  if (prof.student && prof.student.length > 0) {
    return 'Student';
  }
  return 'Unemployed/Retired';
}

export default function MemberCard({ member }: MemberCardProps) {
  const fullName = `${member.personalDetails.firstName} ${member.personalDetails.lastName}`;
  const empStatus = computeEmploymentStatus(member);
  // Use a default photo if photoUrl is not provided.
  const photo = (member as any).photoUrl || '/images/members/avatar.jpg';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded shadow p-4 flex flex-col items-center text-center"
      aria-label={`Member: ${fullName}, ${empStatus}`}
    >
      {/* Photo */}
      <img
        src={photo}
        alt={`Photo of ${fullName}`}
        className="w-24 h-24 object-cover rounded-full mb-2"
      />

      <h3 className="text-lg font-semibold mt-1">{fullName}</h3>
      <p className="text-sm text-gray-600 mb-2">{empStatus}</p>

      <Link
        href={`/community/member/${member._id}`}
        className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-1 rounded font-medium"
        aria-label={`View profile of ${fullName}`}
      >
        View Profile
      </Link>
    </motion.article>
  );
}
