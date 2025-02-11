'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import SidebarItem from './SidebarItem';

export default function MobileSidebar({ menuItems }: { menuItems: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsOpen(false),
    onSwipedRight: () => setIsOpen(true),
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className={`fixed inset-0 ${isOpen ? `w-full z-50` : `w-12 z-30`}`}
    >
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
    </div>
  );
}
