// components/RequestMembership/PrivacyStatement.tsx

import React from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

const PrivacyStatement = () => {
  return (
    <motion.section
      className="py-6 px-4 bg-gray-100 text-center text-sm text-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      aria-labelledby="privacy-heading"
    >
      <h3 id="privacy-heading" className="font-semibold mb-2">
        Privacy Statement
      </h3>
      <p>
        Your privacy is important to us. The information you provide will be
        used solely for the purpose of connecting with our parish community. We
        will not share your details with third parties without your explicit
        consent. For more information, please read our{' '}
        <Link href="/privacy-policy" className="text-blue-600 underline">
          Privacy Policy
        </Link>
        .
      </p>
    </motion.section>
  );
};

export default PrivacyStatement;
