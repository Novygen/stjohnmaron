'use client';

import React from 'react';

interface FilterBoxProps {
  filterText: string;
  setFilterText: (text: string) => void;
}

const FilterBox: React.FC<FilterBoxProps> = ({ filterText, setFilterText }) => {
  return (
    <input
      type="text"
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
      placeholder="Search by name, email, or industry..."
      className="border border-gray-300 px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default FilterBox;
