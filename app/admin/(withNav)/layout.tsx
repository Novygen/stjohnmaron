'use client';

import '@/app/globals.css';
import React from 'react';
import { motion } from 'framer-motion';
import SideNav from '@/components/Admin/sidebar/SideBar';
import TopBar from '@/components/Admin/topbar/TopBar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[var(--color-admin-bg)]">
      <SideNav />
      <div className="flex flex-col flex-grow">
        <TopBar />
        <main className="p-4 flex-grow">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
