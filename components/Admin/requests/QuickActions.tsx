'use client';

import React from 'react';
import { FaEdit, FaEye, FaCheckCircle } from 'react-icons/fa';

interface QuickActionsProps {
  onEdit: () => void;
  onStatus: () => void;
  onView: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onEdit,
  onStatus,
  onView,
}) => {
  return (
    <div className="flex space-x-3">
      <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">
        <FaEdit size={18} />
      </button>
      <button
        onClick={onStatus}
        className="text-green-500 hover:text-green-700"
      >
        <FaCheckCircle size={18} />
      </button>
      <button onClick={onView} className="text-gray-600 hover:text-gray-800">
        <FaEye size={18} />
      </button>
    </div>
  );
};

export default QuickActions;
