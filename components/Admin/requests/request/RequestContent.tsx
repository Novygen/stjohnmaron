'use client';

import React from 'react';
import { Request } from '@/data/request';

interface RequestContentProps {
  request: Request;
  tab: string;
}

export default function RequestContent({ request, tab }: RequestContentProps) {
  return (
    <div className="mt-4">
      {tab === 'details' && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Request Details</h3>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Full Name:</span> {request.fullName}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Email:</span> {request.email}
          </p>
        </div>
      )}

      {tab === 'notes' && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Admin Notes</h3>
          <p className="text-sm text-gray-600">No notes available.</p>
        </div>
      )}

      {tab === 'history' && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Request History</h3>
          <p className="text-sm text-gray-600">
            Request status changes will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
