'use client';

import React from 'react';
import { Request } from '@/data/request';

interface RequestSidebarProps {
  membershipRequest: Request;
}

export default function RequestSidebar({
  membershipRequest,
}: RequestSidebarProps) {
  const { personalDetails, contactInformation, createdAt, isApproved } =
    membershipRequest;

  return (
    <aside className="bg-white rounded-lg shadow p-6 w-full lg:w-1/3">
      <div className="space-y-4">
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
            value={isApproved ? 'Approved' : 'Pending'}
            disabled
            className="inline-block px-2 py-1 rounded border border-gray-300 bg-gray-100"
          />
        </p>
      </div>
    </aside>
  );
}
