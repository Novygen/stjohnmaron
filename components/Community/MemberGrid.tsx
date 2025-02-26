'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemberCard from './MemberCard';
import { Member } from '@/data/members';

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
          <MemberCard key={member._id} member={member} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
