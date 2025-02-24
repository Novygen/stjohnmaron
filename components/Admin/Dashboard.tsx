// components/admin/Dashboard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold">Total Members</h3>
          <p className="text-3xl font-bold">150</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold">Pending Requests</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold">Active Sessions</h3>
          <p className="text-3xl font-bold">5</p>
        </div>
      </div>
    </motion.div>
  );
}
