// components/RequestMembership/HeaderBanner.tsx

'use client';

import React from 'react';

import Image from 'next/image';
import { motion } from 'framer-motion';

const HeaderBanner = () => {
  return (
    <motion.div
      className="relative w-full h-64 md:h-96"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      aria-label="Community submission banner"
    >
      <Image
        src="/images/hero-church.jpg" // Ensure this image exists in public/images/
        alt="Parish community gathering"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-2xl md:text-4xl text-white font-bold">
          Join Our Community Directory
        </h1>
      </div>
    </motion.div>
  );
};

export default HeaderBanner;
