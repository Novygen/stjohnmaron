'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import SidebarItem from './SidebarItem';

export default function MobileSidebar({ menuItems }: { menuItems: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 bg-purple-600 text-white p-2 rounded-full shadow-lg z-50"
      >
        <FiMenu size={24} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 left-0 bg-white shadow-lg w-64 flex flex-col z-50"
        >
          <button onClick={() => setIsOpen(false)} className="self-end p-4">
            ✖️
          </button>
          <nav className="px-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.path}
                item={item}
                pathname={''}
                isExpanded={true}
              />
            ))}
          </nav>
        </motion.div>
      )}
    </>
  );
}
