import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-end py-4 gap-5">
      <button
        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Prev
      </button>
      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
}
