'use client';

import React from 'react';

interface FilterBoxProps {
  filterText: string;
  setFilterText: (text: string) => void;
}

export default function FilterBox({
  filterText,
  setFilterText,
}: FilterBoxProps) {
  return (
    <input
      type="text"
      placeholder="Filter..."
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
    />
  );
}
