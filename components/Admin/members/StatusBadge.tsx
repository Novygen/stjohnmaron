import React from 'react';

interface StatusBadgeProps {
  isVisible: boolean;
}

export default function StatusBadge({ isVisible }: StatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        isVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {isVisible ? 'Active' : 'Inactive'}
    </span>
  );
}
