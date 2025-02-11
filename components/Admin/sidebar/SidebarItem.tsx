'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  item: {
    path: string;
    icon: React.ReactNode;
    name: string;
  };
  pathname: string;
  isExpanded: boolean;
}

export default function SidebarItem({
  item,
  pathname,
  isExpanded,
}: SidebarItemProps) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onClick={() => router.push(item.path)}
      className={`flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer transition-all ${
        pathname.includes(item.path)
          ? 'bg-purple-600 text-white'
          : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      <div className="text-lg">{item.icon}</div>
      {isExpanded && <span className="text-sm font-medium">{item.name}</span>}
    </motion.div>
  );
}
