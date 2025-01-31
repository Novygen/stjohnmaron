// app/community/request-membership/page.tsx

'use client';

import React, { useState } from 'react';
// import { Metadata } from 'next';
import HeaderBanner from '@/components/RequestMembership/HeaderBanner';
import Introduction from '@/components/RequestMembership/Introduction';
import SubmissionForm from '@/components/RequestMembership/SubmissionForm';
import PrivacyStatement from '@/components/RequestMembership/PrivacyStatement';
import SubmissionConfirmation from '@/components/RequestMembership/SubmissionConfirmation';

// Force dynamic rendering to handle async params/searchParams if applicable
export const dynamic = 'force-dynamic';

// export const metadata: Metadata = {
//   title: 'Join Our Community Directory | St. John Maron Maronite Catholic Church',
//   description:
//     'Fill out our Community Member Submission Form to share your story and connect with fellow parishioners at St. John Maron Maronite Catholic Church.',
// };

const RequestMembershipPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsSubmitted(true);
  };

  return (
    <>
      <HeaderBanner />
      <Introduction />
      {!isSubmitted ? (
        <SubmissionForm onSuccess={handleSuccess} />
      ) : (
        <SubmissionConfirmation />
      )}
      <PrivacyStatement />
    </>
  );
};

export default RequestMembershipPage;
