'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase.client';
import { dataServiceFactory } from '@/services/dataService';
import ProfileSidebar from '@/components/Admin/members/member/ProfileSidebar';
import MemberTabs from '@/components/Admin/members/member/MemberTabs';
import MemberContent from '@/components/Admin/members/member/MemberContent';
import { Member } from '@/data/members';

export default function ViewMemberPage() {
  const router = useRouter();
  const params = useParams();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [memberData, setMemberData] = useState<Member | null>(null);
  const [activeTab, setActiveTab] = useState('');

  const dataService = dataServiceFactory();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
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
      const data = await dataService.getMember({ id: memberId });
      setMemberData(data);
    } catch (error) {
      console.error('Failed to fetch member:', error);
    }
  }

  if (loadingAuth) return <div className="p-4">Checking authentication...</div>;
  if (!memberData) return <div className="p-4">Loading member data...</div>;

  function handleTabChange(tab: string) {
    setActiveTab(tab);
  }

  return (
    <div className="flex flex-col lg:flex-row p-6 space-x-1 lg:space-x-6 bg-gray-50 min-h-screen">
      {/* Left Sidebar */}
      <ProfileSidebar member={memberData} />

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <MemberTabs onTabChange={handleTabChange} />
        <MemberContent member={memberData} tab={activeTab} />
      </div>
    </div>
  );
}
