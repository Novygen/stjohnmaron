'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase.client';
import { dataServiceFactory } from '@/services/dataService';
import RequestSidebar from '@/components/Admin/requests/request/RequestSidebar';
import RequestTabs from '@/components/Admin/requests/request/RequestTabs';
import RequestContent from '@/components/Admin/requests/request/RequestContent';
import { Request } from '@/data/request';

export default function ViewRequestPage() {
  const router = useRouter();
  const params = useParams();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [requestData, setRequestData] = useState<Request | null>(null);
  const [activeTab, setActiveTab] = useState('details');

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
      fetchRequest(params.id);
    }
  }, [loadingAuth, params.id]);

  async function fetchRequest(requestId: string) {
    try {
      const data = await dataService.getRequest({ id: requestId });
      setRequestData(data);
    } catch (error) {
      console.error('Failed to fetch request:', error);
    }
  }

  if (loadingAuth) return <div className="p-4">Checking authentication...</div>;
  if (!requestData) return <div className="p-4">Loading request data...</div>;

  function handleTabChange(tab: string) {
    setActiveTab(tab);
  }

  return (
    <div className="flex flex-col lg:flex-row p-6 space-x-1 lg:space-x-6 bg-gray-50 min-h-screen">
      {/* Left Sidebar */}
      <RequestSidebar membershipRequest={requestData} />

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <RequestTabs onTabChange={handleTabChange} activeTab={activeTab} />
        <RequestContent membershipRequest={requestData} tab={activeTab} />
      </div>
    </div>
  );
}
