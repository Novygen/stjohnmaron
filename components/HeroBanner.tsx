// components/HeroBanner.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBanner() {
  return (
    <section
      className="
        relative
        h-[70vh]
        flex
        items-center
        justify-center
        bg-cover
        bg-center
        text-white
      "
      style={{
        backgroundImage: 'url("/images/hero-church.jpg")',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      {/* Animated text */}
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Welcome to St John Maron
        </h1>
        <p className="text-lg md:text-xl mb-6">
          A community of faith, hope, and love
        </p>
        <a
          href="#welcome"
          className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded"
        >
          Learn More
        </a>
      </motion.div>
    </section>
  );
}
