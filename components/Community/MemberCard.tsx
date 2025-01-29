// components/Community/MemberCard.tsx
'use client';

import React from 'react';

import { Member } from '@/data/members';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded shadow p-4 flex flex-col items-center text-center"
      aria-label={`Member: ${member.name}, ${member.specialization}`}
    >
      {/* Photo */}
      {member.photoUrl && (
        <img
          src={member.photoUrl}
          alt={`Photo of ${member.name}`}
          className="w-24 h-24 object-cover rounded-full mb-2"
        />
      )}

      <h3 className="text-lg font-semibold mt-1">{member.name}</h3>
      <p className="text-sm text-gray-600 mb-2">
        {member.industry} – {member.specialization}
      </p>
      <p className="text-sm text-gray-700 line-clamp-2">{member.bio}</p>

      <Link
        href={`/community/${member.id}`}
        className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-1 rounded font-medium"
        aria-label={`View profile of ${member.name}`}
      >
        View Profile
      </Link>
    </motion.article>
  );
}
