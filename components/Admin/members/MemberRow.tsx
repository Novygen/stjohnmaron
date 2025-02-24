import React from 'react';
import { Member } from '@/data/member';
import QuickActions from '@/components/Admin/members/QuickActions';
import StatusBadge from '@/components/Admin/members/StatusBadge';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row items-center justify-between py-3 px-4 bg-blue-50 hover:bg-gray-100 transition-all rounded-lg mb-3 drop-shadow-sm z-10 hover:drop-shadow-md hover:z-10 relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-2 right-2 md:hidden">
        <span
          className={`inline-block w-3 h-3 rounded-full ${
            member.fullName ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></span>
      </div>
      <div className="flex items-center gap-4 mb-3 md:mb-0 w-full md:w-auto">
        <Image
          src={member.photoUrl || '/profile.avif'}
          alt={member.fullName}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{member.fullName}</h3>
          <p className="text-sm text-gray-500">{member.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:flex md:flex-row items-start md:items-center gap-2 md:gap-6 w-full md:w-auto">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Birthday:</span> {member.yearOfBirth}
        </p>
        <div className="hidden md:block">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Industry:</span>{' '}
            {member.industry.name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Position:</span>{' '}
            {member.jobTitle || 'N/A'}
          </p>
        </div>
        <span className="hidden md:block">
          <StatusBadge isVisible={!!member.fullName} />
        </span>
        <QuickActions onEdit={onEdit} onStatus={onStatus} onView={onView} />
      </div>
    </motion.div>
  );
}
