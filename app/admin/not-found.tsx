// app/admin/not-found.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold mb-4"
      >
        404 - Not Found
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-lg"
      >
        The page you are looking for does not exist.
      </motion.p>
    </div>
  );
}
