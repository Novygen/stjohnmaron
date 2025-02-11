'use client';

import React from 'react';

interface RequestTabsProps {
  onTabChange: (tab: string) => void;
}

export default function RequestTabs({ onTabChange }: RequestTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-4">
        <button
          onClick={() => onTabChange('details')}
          className="py-2 px-4 text-sm font-medium hover:text-blue-600"
        >
          Details
        </button>
        <button
          onClick={() => onTabChange('notes')}
          className="py-2 px-4 text-sm font-medium hover:text-blue-600"
        >
          Notes
        </button>
        <button
          onClick={() => onTabChange('history')}
          className="py-2 px-4 text-sm font-medium hover:text-blue-600"
        >
          History
        </button>
      </nav>
    </div>
  );
}
