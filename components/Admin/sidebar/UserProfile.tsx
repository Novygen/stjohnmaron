'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function UserProfile({ isExpanded }: { isExpanded: boolean }) {
  const [user, setUser] = useState({
    name: 'Elio Gerges',
    role: 'Software Engineer',
    avatar: '/profile.jpg',
  });

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch user from localStorage (replace with API later)
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUser({
        name: 'Elio Gerges',
        role: 'Software Engineer',
        avatar: '/profile.jpg',
      });
    }
  }, []);

  // Auto-close dropdown after 10 seconds
  useEffect(() => {
    if (isDropdownOpen) {
      timeoutRef.current = setTimeout(() => setDropdownOpen(false), 10000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isDropdownOpen]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="relative px-4 py-6 border-t">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-white">
          E
        </div>
        <div className="hidden sm:block">
          {isExpanded && (
            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          )}
        </div>
        {isExpanded && <BsThreeDotsVertical className="hidden sm:block" />}
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-16 left-4 bg-white shadow-lg rounded-lg overflow-hidden w-36"
        >
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
            Settings
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
            Log Out
          </button>
        </motion.div>
      )}
    </div>
  );
}
