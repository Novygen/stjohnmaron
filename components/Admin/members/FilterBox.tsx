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
      placeholder="Search members"
      className="border border-gray-300 rounded-lg px-4 py-2"
    />
  );
};

export default FilterBox;
