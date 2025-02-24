'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Member } from '@/data/members';

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  // Use a default image if photoUrl is not provided
  const photo = member.photoUrl || '/images/members/avatar.jpg';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded shadow p-4 flex flex-col items-center text-center"
      aria-label={`Member: ${member.fullName}, ${member.specialization}`}
    >
      {/* Photo */}
      <img
        src={photo}
        alt={`Photo of ${member.fullName}`}
        className="w-24 h-24 object-cover rounded-full mb-2"
      />

      <h3 className="text-lg font-semibold mt-1">{member.fullName}</h3>
      <p className="text-sm text-gray-600 mb-2">
        {member.industry.name} – {member.specialization.name}
      </p>
      {member.shortBio && (
        <p className="text-sm text-gray-700 line-clamp-2">{member.shortBio}</p>
      )}

      <Link
        href={`/community/member/${member._id}`}
        className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-1 rounded font-medium"
        aria-label={`View profile of ${member.fullName}`}
      >
        View Profile
      </Link>
    </motion.article>
  );
}
