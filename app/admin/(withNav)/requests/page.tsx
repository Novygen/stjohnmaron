// app/admin/members/page.tsx
'use client';

import RequestsDataTable from '@/components/Admin/requests/RequestsDataTable';
import React, { Suspense } from 'react';

export default async function MembersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RequestsDataTable />
    </Suspense>
  );
}
