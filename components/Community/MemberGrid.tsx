// components/Community/MemberGrid.tsx
'use client';

import React from 'react';

import MemberCard from './MemberCard';
import { Member } from '@/data/members';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberGridProps {
  members: Member[];
}

export default function MemberGrid({ members }: MemberGridProps) {
  return (
    <motion.div
      layout
      className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      aria-live="polite"
    >
      <AnimatePresence>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
