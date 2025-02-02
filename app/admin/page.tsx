'use client';

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { firebaseAuth } from '@/lib/firebase.client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Listen for changes in the Firebase Auth user
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // User is authenticated, show the dashboard
        router.replace('/admin/dashboard');
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

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg('');

    try {
      // Use Firebase's client-side signInWithEmailAndPassword
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      // On success, redirect to admin dashboard
      router.push('/admin/dashboard');
    } catch (error) {
      // Handle errors (invalid credentials, etc.)
      setErrorMsg((error as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold text-center">Admin Login</h2>

        {errorMsg && <p className="text-red-500">{errorMsg}</p>}

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="border border-gray-300 rounded w-full p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            className="border border-gray-300 rounded w-full p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
