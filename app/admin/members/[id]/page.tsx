'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase.client'; // your Firebase client config
import axios from 'axios';

interface MemberData {
  _id: string;
  fullName: string;
  email: string;
  industry?: { _id: string; name: string };
  specialization?: { _id: string; name: string };
  // etc...
}

export default function ViewMemberPage() {
  const router = useRouter();
  const params = useParams(); // { id: string }
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [memberData, setMemberData] = useState<MemberData | null>(null);

  useEffect(() => {
    // Lazy load: check if user is authenticated
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        // not authenticated, redirect
        router.replace('/admin');
      } else {
        setLoadingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!loadingAuth && typeof params.id === 'string') {
      fetchMember(params.id);
    }
  }, [loadingAuth, params.id]);

  async function fetchMember(memberId: string) {
    try {
      const token = await firebaseAuth.currentUser?.getIdToken();
      const res = await axios.get(`/api/admin/v1/members/${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMemberData(res.data);
    } catch (error) {
      console.error('Failed to fetch member:', error);
    }
  }

  if (loadingAuth) {
    return <div className="p-4">Checking authentication...</div>;
  }

  if (!memberData) {
    return <div className="p-4">Loading member data...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Member Details</h1>
      <p>
        <strong>Full Name:</strong> {memberData.fullName}
      </p>
      <p>
        <strong>Email:</strong> {memberData.email}
      </p>
      {memberData.industry && (
        <p>
          <strong>Industry:</strong> {memberData.industry.name}
        </p>
      )}
      {memberData.specialization && (
        <p>
          <strong>Specialization:</strong> {memberData.specialization.name}
        </p>
      )}
      {/* Additional fields like phone, website, shortBio, etc. */}
    </div>
  );
}
