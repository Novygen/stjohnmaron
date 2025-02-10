'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import SidebarItem from '@/components/Admin/sidebar/SidebarItem';
import SidebarToggle from '@/components/Admin/sidebar/SidebarToggle';
import UserProfile from '@/components/Admin/sidebar/UserProfile';
import MobileSidebar from '@/components/Admin/sidebar/MobileSidebar';
import { FaChartPie, FaBox, FaUsers, FaBullhorn, FaCog } from 'react-icons/fa';

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: <FaChartPie /> },
  { name: 'Requests', path: '/admin/requests', icon: <FaBox /> },
  { name: 'Members', path: '/admin/members', icon: <FaUsers /> },
  { name: 'Businesses', path: '/admin/businesses', icon: <FaBullhorn /> },
  { name: 'Promote', path: '/admin/promote', icon: <FaCog /> },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Handle window resize for mobile responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileSidebar menuItems={menuItems} />
      ) : (
        <motion.aside
          animate={{ width: isExpanded ? 240 : 80 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-screen bg-white shadow-lg flex flex-col sticky top-0 left-0 z-50"
        >
          {/* Sidebar Toggle (Now Always Visible) */}
          <SidebarToggle
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />

          {/* Logo (Text-Based) */}
          <div className="flex items-center justify-center py-6 font-bold text-lg">
            {isExpanded ? 'Dashboard' : ''}
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.path}
                item={item}
                pathname={pathname}
                isExpanded={isExpanded}
              />
            ))}
          </nav>

          {/* User Profile */}
          <UserProfile isExpanded={isExpanded} />
        </motion.aside>
      )}
    </>
  );
}
