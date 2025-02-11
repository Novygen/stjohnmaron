// app/admin/login/layout.tsx
import '@/app/globals.css';

import React from 'react';

export const metadata = {
  title: 'Admin Login - St. John Maron',
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
