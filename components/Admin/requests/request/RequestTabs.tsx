'use client';

import React from 'react';

interface RequestTabsProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export default function RequestTabs({
  onTabChange,
  activeTab,
}: RequestTabsProps) {
  const tabs = ['details', 'notes', 'history'];
  return (
    <div className="border-b border-gray-200 mb-4">
      <nav className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'hover:text-blue-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>
    </div>
  );
}
