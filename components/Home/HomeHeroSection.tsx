// components/Home/HomeHeroSection.tsx
'use client';

import React from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomeHeroSection() {
  return (
    <section
      className="
        relative
        flex
        items-center
        justify-center
        h-[70vh]
        bg-no-repeat bg-cover bg-center
        text-white
      "
      style={{
        backgroundImage: 'url("/images/hero-church.jpg")',
      }}
      aria-label="Hero background image welcoming visitors to St. John Maron Church"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Welcome to St. John Maron Maronite Catholic Church
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Where Faith, Tradition, and Community Come Together
        </p>
        <div className="space-x-4">
          <Link
            href="#mass-schedule"
            className="inline-block bg-yellow-400 text-gray-900 px-5 py-2 font-semibold rounded hover:bg-yellow-500"
          >
            Join Us for Mass
          </Link>
          <Link
            href="#about-parish"
            className="inline-block bg-gray-200 text-gray-800 px-5 py-2 font-semibold rounded hover:bg-gray-300"
          >
            Learn More About Our Parish
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
