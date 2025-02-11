'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';

export default function Breadcrumb() {
  const pathname = usePathname();

  const pathSegments = pathname
    .split('/')
    .filter((segment) => segment && segment !== 'admin');

  const getColor = (index: number) => {
    const colors = [
      'text-gray-500',
      'text-blue-500',
      'text-purple-500',
      'text-red-500',
    ];
    return colors[index % colors.length]; // Cycles through the colors
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="text-xs sm:text-sm mt-1 flex items-center space-x-1"
    >
      {pathSegments.length > 0 ? (
        <>
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const href = `/admin/${pathSegments.slice(0, index + 1).join('/')}`;

            return (
              <span key={index} className="flex items-center">
                <Link
                  href={href}
                  className={clsx('font-semibold', getColor(index), {
                    'cursor-pointer hover:underline': !isLast,
                  })}
                >
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
                {!isLast && <span className="text-gray-400 mx-1">/</span>}
              </span>
            );
          })}
        </>
      ) : (
        <span className="text-gray-600 font-semibold">Dashboard</span>
      )}
    </motion.div>
  );
}
