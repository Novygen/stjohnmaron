// components/Home/MissionSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function MissionSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
          <p className="max-w-3xl mx-auto mb-6 text-lg">
            At St John Maron, our mission is to grow in faith, celebrate the
            sacraments, and serve the needs of our community through charity and
            love.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
