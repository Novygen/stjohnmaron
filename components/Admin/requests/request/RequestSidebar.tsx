'use client';

import React from 'react';
import { Request } from '@/data/request';

interface RequestSidebarProps {
  request: Request;
}

export default function RequestSidebar({ request }: RequestSidebarProps) {
  const { personal_details, contact_information, createdAt, isApproved } =
    request;

  return (
    <aside className="bg-white rounded-lg shadow p-6 w-full lg:w-1/3">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={personal_details.first_name}
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={personal_details.last_name}
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            value={contact_information.primary_email}
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            value={contact_information.primary_phone_number}
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md"
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
