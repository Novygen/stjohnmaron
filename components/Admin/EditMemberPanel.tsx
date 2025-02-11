// components/admin/EditMemberPanel.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Member } from '@/data/member';
import { dataServiceFactory } from '@/services/dataService';

interface EditMemberPanelProps {
  member: Member;
  onClose: () => void;
  onUpdated: (updatedMember: Member) => void;
}

export default function EditMemberPanel({
  member,
  onClose,
  onUpdated,
}: EditMemberPanelProps) {
  const [formData, setFormData] = useState<Partial<Member>>(member);
  const [loading, setLoading] = useState(false);
  const dataService = dataServiceFactory();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedMember = await dataService.updateMember(
        member._id,
        formData,
      );
      onUpdated(updatedMember);
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to update member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 p-4 overflow-y-auto"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
    >
      <h2 className="text-xl font-bold mb-4">Edit Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        {/* Additional fields can be added here */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[var(--color-accent)] text-white rounded"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
