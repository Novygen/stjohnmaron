'use client';

import React, { useState } from 'react';
import { Request } from '@/data/request';

interface EditRequestPanelProps {
  request: Request;
  onClose: () => void;
  onUpdated: () => void;
  className?: string;
}

const EditRequestPanel: React.FC<EditRequestPanelProps> = ({
  request,
  onClose,
  onUpdated,
  className,
}) => {
  const [status, setStatus] = useState<'Pending' | 'Approved' | 'Rejected'>(
    request.status,
  );

  const handleSave = () => {
    onUpdated();
  };

  return (
    <div
      className={`fixed top-0 right-0 w-[450px] h-full bg-white shadow-lg p-6 z-50 overflow-auto ${className}`}
    >
      <h2 className="text-xl font-semibold mb-4">Edit Request</h2>
      <p className="text-gray-700 text-sm mb-2">
        Full Name: {request.fullName}
      </p>
      <p className="text-gray-700 text-sm mb-2">Email: {request.email}</p>
      <p className="text-gray-700 text-sm mb-4">Industry: {request.industry}</p>

      <label className="block font-medium mb-2">Status</label>
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as 'Pending' | 'Approved' | 'Rejected')
        }
        className="border border-gray-300 px-4 py-2 rounded-lg w-full mb-4"
      >
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditRequestPanel;
