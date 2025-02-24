// components/Admin/requests/DropdownFilter.tsx
import React from 'react';

interface DropdownFilterProps {
  statusFilter: 'Pending' | 'Approved' | 'Rejected' | null;
  setStatusFilter: (status: 'Pending' | 'Approved' | 'Rejected' | null) => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <select
      value={statusFilter || ''}
      onChange={(e) =>
        setStatusFilter(
          e.target.value as 'Pending' | 'Approved' | 'Rejected' | null,
        )
      }
      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
    >
      <option value="">All Statuses</option>
      <option value="Pending">Pending</option>
      <option value="Approved">Approved</option>
      <option value="Rejected">Rejected</option>
    </select>
  );
};

export default DropdownFilter;
