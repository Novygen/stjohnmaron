// components/Admin/requests/StatusBadge.tsx
'use client';

import React from 'react';

interface StatusBadgeProps {
  status: 'Pending' | 'Approved' | 'Rejected';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Approved':
        return 'bg-green-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-black';
      case 'Rejected':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-gray-800';
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor()}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
