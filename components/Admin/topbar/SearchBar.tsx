'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="relative items-center bg-white border rounded-lg px-3 py-2 shadow-sm hidden sm:flex max-w-screen-sm"
    >
      <Search className="h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className="ml-2 outline-none text-sm w-24 sm:w-32 md:w-48 bg-transparent"
      />
    </motion.div>
  );
}
