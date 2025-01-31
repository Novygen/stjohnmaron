// components/RequestMembership/SubmissionConfirmation.tsx

import React from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const SubmissionConfirmation = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      aria-labelledby="confirmation-heading"
    >
      <CheckCircleIcon className="h-20 w-20 text-green-500 mb-4" />
      <h2
        id="confirmation-heading"
        className="text-2xl md:text-3xl font-bold mb-4"
      >
        Thank You for Joining Our Community Directory!
      </h2>
      <p className="text-lg mb-6">
        Your information has been received and is pending approval. We’ll notify
        you once your profile is live.
      </p>
      <Link
        href="/community"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
        aria-label="Return to Community Directory"
      >
        Back to Community Directory
      </Link>
    </motion.div>
  );
};

export default SubmissionConfirmation;
