'use client';

import React, { useState } from 'react';
import { Request } from '@/data/request';

interface RequestSidebarProps {
  membershipRequest: Request;
}

export default function RequestSidebar({
  membershipRequest,
}: RequestSidebarProps) {
  const {
    personalDetails,
    contactInformation,
    createdAt,
    isApproved,
    isActioned,
    _id,
  } = membershipRequest;
  const [loadingAction, setLoadingAction] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionedStatus, setActionedStatus] = useState<string | null>(null);

  async function handleAction(approved: boolean) {
    setLoadingAction(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/v1/membershipRequests/requestToMember/${_id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ approved }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Action failed');
      }
      setActionedStatus(approved ? 'Approved' : 'Rejected');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingAction(false);
    }
  }

  return (
    <aside className="bg-white rounded-lg shadow p-6 w-full lg:w-1/3">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick View</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={personalDetails.firstName}
            disabled
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={personalDetails.lastName}
            disabled
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            value={contactInformation.primaryEmail}
            disabled
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            value={contactInformation.primaryPhoneNumber}
            disabled
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Requested On:</span>{' '}
          {new Date(createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Status:</span>{' '}
          <input
            type="text"
            value={
              isActioned
                ? actionedStatus || (isApproved ? 'Approved' : 'Rejected')
                : 'Pending'
            }
            disabled
            className="inline-block px-2 py-1 rounded border border-gray-300 bg-gray-100"
          />
        </p>
      </div>
      {/* If not actioned, display Approve and Reject buttons */}
      {!isActioned && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => handleAction(true)}
            disabled={loadingAction}
            className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            {loadingAction ? 'Processing...' : 'Approve'}
          </button>
          <button
            onClick={() => handleAction(false)}
            disabled={loadingAction}
            className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            {loadingAction ? 'Processing...' : 'Reject'}
          </button>
        </div>
      )}
      {error && <p className="mt-4 text-red-500 text-sm">Error: {error}</p>}
    </aside>
  );
}
