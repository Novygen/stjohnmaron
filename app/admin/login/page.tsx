'use client';

import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth } from '@/lib/firebase.client';
import { User } from 'firebase/auth';
import { setUser } from '@/store/userSlice';
import { setCookie } from 'cookies-next';

const extractUserData = (user: User) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  emailVerified: user.emailVerified,
});

export default function AdminLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(
    (state: {
      user: {
        uid: string;
        email: string | null;
        displayName: string | null;
        photoURL: string | null;
        emailVerified: boolean;
      } | null;
    }) => state.user,
  );
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // useEffect(() => {
  //   // Listen for changes in Firebase authentication state.
  //   const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
  //     if (user) {
  //       // If the user is already signed in, get the ID token.
  //       const idToken = await user.getIdToken();
  //       // Call the session login API endpoint to create a session cookie.
  //       const res = await fetch("/api/admin/sessionLogin", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ idToken }),
  //       });
  //       console.log("Response: ", res);
  //       if (res.ok) {
  //         dispatch(setUser(extractUserData(user)));
  //         router.replace("/admin/dashboard");
  //       } else {
  //         setLoading(false);
  //       }
  //     } else {
  //       dispatch(clearUser());
  //       setLoading(false);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [router, dispatch]);

  useEffect(() => {
    if (!loading && !user) {
      setLoading(false);
    }
  }, [loading, user]);

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
      // Sign in with Firebase.
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      if (user) {
        const userData = extractUserData(user);
        dispatch(setUser(userData));
        setCookie('user', idToken, {
          maxAge: 30 * 24 * 60 * 60,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        setLoading(false);
        router.replace('/admin/dashboard');
      } else {
        setLoading(false);
        setErrorMsg('Failed to sign in');
      }
    } catch (error) {
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
