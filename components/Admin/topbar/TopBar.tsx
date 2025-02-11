'use client';

import React from 'react';
import Greeting from '@/components/Admin/topbar/Greeting';
import Breadcrumb from '@/components/Admin/topbar/Breadcrumb';
import SearchBar from '@/components/Admin/topbar/SearchBar';
import NotificationButton from '@/components/Admin/topbar/NotificationButton';
import { motion } from 'framer-motion';

export default function TopBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-row justify-between items-center p-2 sm:p-4 bg-white shadow-sm w-full sticky top-0 right-0 z-40"
    >
      <div className="pl-5">
        <Greeting />
        <Breadcrumb />
      </div>
      <div className="flex flex-row items-center gap-2 sm:gap-4">
        <SearchBar />
        <NotificationButton />
      </div>
    </motion.div>
  );
}
