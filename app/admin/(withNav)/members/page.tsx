// app/admin/members/page.tsx
import React, { Suspense } from 'react';
import MembersDataTable from '@/components/Admin/members/MembersDataTable';

export default async function MembersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MembersDataTable />
    </Suspense>
  );
}
