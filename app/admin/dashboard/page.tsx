'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase.client';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for changes in the Firebase Auth user
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        // If no user is logged in, redirect to admin/login
        router.replace('/admin');
      } else {
        // User is authenticated, show the dashboard
        setLoading(false);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [router]);

  // Display a loading indicator while we confirm authentication status
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Once authenticated, render the protected dashboard
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
      <p>This page is visible only to authenticated admin users.</p>
      {/* Add your dashboard UI here */}
    </div>
  );
}
