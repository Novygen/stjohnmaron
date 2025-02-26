import React from 'react';
import { FaPen, FaAdjust, FaEye } from 'react-icons/fa';

interface QuickActionsProps {
  onView: () => void;
}

export default function QuickActions({ onView }: QuickActionsProps) {
  return (
    <div className="flex flex-row justify-around md:gap-1">
      <button
        className="block text-left px-4 py-2 text-gray-700 hover:bg-gray-100 z-50"
        onClick={onView}
      >
        <FaEye className="inline-block mr-2" />
      </button>
    </div>
  );
}
