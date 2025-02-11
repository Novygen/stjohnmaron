'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotificationButton() {
  return (
    <motion.button
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200"
    >
      <Bell className="h-5 w-5 text-gray-500" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full sm:w-5 sm:h-5 sm:text-sm">
        3
      </span>
    </motion.button>
  );
}
