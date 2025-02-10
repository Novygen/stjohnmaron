import React from 'react';
import { FaPen, FaAdjust, FaEye } from 'react-icons/fa';

interface QuickActionsProps {
  onEdit: () => void;
  onStatus: () => void;
  onView: () => void;
}

export default function QuickActions({
  onEdit,
  onStatus,
  onView,
}: QuickActionsProps) {
  return (
    <div className="flex flex-row gap-1">
      <button
        className="block text-left px-4 py-2 text-gray-700 hover:bg-gray-100 z-50"
        onClick={onEdit}
      >
        <FaPen className="inline-block mr-2" />
      </button>
      <button
        className="block text-left px-4 py-2 text-gray-700 hover:bg-gray-100 z-50"
        onClick={onStatus}
      >
        <FaAdjust className="inline-block mr-2" />
      </button>
      <button
        className="block text-left px-4 py-2 text-gray-700 hover:bg-gray-100 z-50"
        onClick={onView}
      >
        <FaEye className="inline-block mr-2" />
      </button>
    </div>
  );
}
