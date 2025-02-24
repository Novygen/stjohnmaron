'use client';

import React from 'react';
import { FaEye } from 'react-icons/fa';

interface QuickActionsProps {
  onView: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onView }) => {
  return (
    <div className="flex space-x-3">
      <button onClick={onView} className="text-gray-600 hover:text-gray-800">
        <FaEye size={18} />
      </button>
    </div>
  );
};

export default QuickActions;
