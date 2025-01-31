// components/RequestMembership/Introduction.tsx

import React from 'react';

import { motion } from 'framer-motion';

const Introduction = () => {
  return (
    <motion.section
      className="py-8 px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-labelledby="introduction-heading"
    >
      <h2
        id="introduction-heading"
        className="text-xl md:text-2xl font-semibold mb-4"
      >
        Become a Part of Our Parish Family
      </h2>
      <p className="text-md md:text-lg max-w-2xl mx-auto">
        We’re excited to include you in our community directory! Please fill out
        the form below to share your information with fellow parishioners. Your
        participation helps strengthen our bonds and fosters a supportive
        environment.
      </p>
      <p className="text-sm md:text-md text-gray-600 mt-2">
        Ensure all required fields are completed accurately. Fields marked with
        an asterisk (<span className="text-red-500">*</span>) are mandatory.
      </p>
    </motion.section>
  );
};

export default Introduction;
