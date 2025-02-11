import React, { useState, useRef, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

interface DropdownFilterProps {
  ageRange: [number, number] | null;
  setAgeRange: (range: [number, number] | null) => void;
  visibilityStatus: 'visible' | 'hidden' | null;
  setVisibilityStatus: (status: 'visible' | 'hidden' | null) => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  ageRange,
  setAgeRange,
  visibilityStatus,
  setVisibilityStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaFilter className="inline mr-2" /> Filter
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
          <div className="p-4">
            <label className="block mb-2">Age Range</label>
            <Slider
              range
              min={0}
              max={100}
              value={ageRange || [0, 100]}
              onChange={(value: number | number[]) => {
                if (Array.isArray(value)) {
                  setAgeRange(value as [number, number]);
                }
              }}
              className="mb-2"
            />
            <div className="flex justify-between text-xs">
              <span>{ageRange ? ageRange[0] : 0}</span>
              <span>{ageRange ? ageRange[1] : 100}</span>
            </div>
          </div>
          <div className="p-4">
            <label className="block mb-2">Visibility Status</label>
            <select
              value={visibilityStatus || ''}
              onChange={(e) => {
                setVisibilityStatus(
                  e.target.value as 'visible' | 'hidden' | null,
                );
                setIsOpen(false);
              }}
              className="border border-gray-300 rounded-lg px-2 py-1 w-full"
            >
              <option value="">All</option>
              <option value="visible">Visible</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
