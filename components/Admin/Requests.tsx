// components/admin/Requests.tsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Requests() {
  // Dummy data; in a real app, fetch from your API.
  const requests = [
    { id: 1, name: 'Alice Brown', status: 'Pending' },
    { id: 2, name: 'Bob Johnson', status: 'Approved' },
    // More dummy data as needed.
  ];

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-[var(--color-admin-text)]">
        Membership Requests
      </h2>
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b">
                <td className="px-4 py-2">{req.id}</td>
                <td className="px-4 py-2">{req.name}</td>
                <td className="px-4 py-2">{req.status}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
