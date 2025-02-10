import React, { useState } from 'react';
import { motion } from 'framer-motion';

const tabs = ['About', 'Employment', 'Businesses'];

interface MemberTabsProps {
  onTabChange: (tab: string) => void;
}

export default function MemberTabs({ onTabChange }: MemberTabsProps) {
  const [activeTab, setActiveTab] = useState('About');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex bg-gray-200 rounded-3xl p-1 w-fit">
      {tabs.map((tab) => (
        <motion.button
          key={tab}
          className={`px-3 py-1 rounded-2xl transition ${
            activeTab === tab ? 'bg-blue-500 text-white' : 'text-gray-700'
          }`}
          onClick={() => handleTabChange(tab)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ opacity: activeTab === tab ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          {tab}
        </motion.button>
      ))}
    </div>
  );
}
