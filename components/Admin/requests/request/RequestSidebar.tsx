'use client';

import React from 'react';
import Image from 'next/image';
import { Request } from '@/data/request';

interface RequestSidebarProps {
  request: Request;
}

export default function RequestSidebar({ request }: RequestSidebarProps) {
  return (
    <aside className="bg-white rounded-lg shadow p-6 w-full lg:w-1/3">
      <div className="flex items-center space-x-4">
        <div>
          <h2 className="text-lg font-semibold">{request.fullName}</h2>
          <p className="text-sm text-gray-500">{request.email}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Requested On:</span>{' '}
          {request.createdAt}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Status:</span>{' '}
          <span
            className={`px-2 py-1 rounded ${
              request.status === 'Approved'
                ? 'bg-green-500 text-white'
                : request.status === 'Pending'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-red-500 text-white'
            }`}
          >
            {request.status}
          </span>
        </p>
      </div>
    </aside>
  );
}
