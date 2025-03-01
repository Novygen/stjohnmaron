'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Request } from '@/data/request';
import QuickActions from '@/components/Admin/requests/QuickActions';

interface RequestRowProps {
  request: Request;
  onView: () => void;
}

export default function RequestRow({ request, onView }: RequestRowProps) {
  const fullName = `${request.personalDetails.firstName} ${request.personalDetails.lastName}`;
  const email = request.contactInformation.primaryEmail;

  return (
    <motion.div
      className="flex justify-between items-center py-3 px-4 bg-blue-50 hover:bg-gray-100 transition-all rounded-lg mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h3 className="font-medium text-gray-900">{fullName}</h3>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
      <QuickActions onView={onView} />
    </motion.div>
  );
}
