/* eslint-disable @typescript-eslint/no-explicit-any */
// components/admin/StatusModal.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { dataServiceFactory } from '@/services/dataService';

interface StatusModalProps {
  memberId: string;
  currentStatus: string;
  onClose: () => void;
  onStatusUpdated: (newStatus: string) => void;
  mode: 'member' | 'request';
}

export default function StatusModal({
  memberId,
  currentStatus,
  onClose,
  onStatusUpdated,
  mode,
}: StatusModalProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const dataService = dataServiceFactory();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (mode === 'member') {
        // For a member, update (for example) the visibility (this demo simply calls updateMember)
        await dataService.updateMember(memberId, {} as any);
        onStatusUpdated(status);
      } else {
        // For a request, only allow if pending (approve or reject)
        await dataService.updateRequestStatus(
          memberId,
          status as 'Approved' | 'Rejected',
        );
        onStatusUpdated(status);
      }
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded shadow-lg w-1/3"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <h2 className="text-xl font-bold mb-4">Change Status</h2>
        {mode === 'member' ? (
          <div>
            <label className="block mb-2">Visibility</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
        ) : (
          <div>
            <label className="block mb-2">Request Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="Approved">Approve</option>
              <option value="Rejected">Reject</option>
            </select>
          </div>
        )}
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-[var(--color-accent)] text-white rounded"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
