/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

export default function SidebarToggle({ isExpanded, setIsExpanded }: any) {
  return (
    <motion.button
      onClick={() => setIsExpanded(!isExpanded)}
      className="absolute top-6 right-[-12px] bg-gray-200 rounded-full p-2 shadow-lg z-50 sm:right-[-24px]"
      whileHover={{ scale: 1.1 }}
    >
      {isExpanded ? (
        <FiChevronsLeft size={20} />
      ) : (
        <FiChevronsRight size={20} />
      )}
    </motion.button>
  );
}
