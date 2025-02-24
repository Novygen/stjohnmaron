'use client';

import React, { Suspense } from 'react';
import MembershipRequestsList from '@/components/Admin/requests/MembershipRequestsList';

export default function MembershipRequestsPage() {
  return (
    <Suspense fallback={<div>Loading membership requests...</div>}>
      <MembershipRequestsList />
    </Suspense>
  );
}
