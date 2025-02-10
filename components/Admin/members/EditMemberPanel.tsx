'use client';

import React, { useState } from 'react';
import { Member } from '@/data/member';
import { motion } from 'framer-motion';

interface EditMemberPanelProps {
  member: Member;
  onClose: () => void;
  onUpdated: (updatedMember: Member) => void;
  className?: string;
}

export default function EditMemberPanel({
  member,
  onClose,
  onUpdated,
  className,
}: EditMemberPanelProps) {
  const [editedMember, setEditedMember] = useState<Member>(member);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setEditedMember({
      ...editedMember,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onUpdated(editedMember);
    onClose();
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`bg-white shadow-xl p-6 overflow-y-auto z-50 ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Member</h2>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={editedMember.fullName}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-gray-50"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={editedMember.email}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-gray-50"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={editedMember.phoneNumber || ''}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-gray-50"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Industry
          </label>
          <input
            type="text"
            name="industry"
            value={editedMember.industry.name}
            disabled
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Specialization
          </label>
          <input
            type="text"
            name="specialization"
            value={editedMember.specialization.name}
            disabled
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        {/* Short Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Short Bio
          </label>
          <textarea
            name="shortBio"
            value={editedMember.shortBio || ''}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-gray-50"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Save Changes
        </button>
      </div>
    </motion.div>
  );
}
