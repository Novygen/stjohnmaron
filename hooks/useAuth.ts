// hooks/useAuth.ts
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);
}
