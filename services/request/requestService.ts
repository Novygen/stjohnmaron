import { Request, RequestsAPI } from '@/data/request';
import { GetRequestParams, GetRequestsParams } from './request.interfaces';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || './';

export async function getRequests(
  params: GetRequestsParams,
): Promise<RequestsAPI> {
  const queryParams = new URLSearchParams({
    page: params.page,
    limit: params.limit,
    ...(params.search ? { search: params.search } : {}),
    ...(params.sortField ? { sortField: params.sortField } : {}),
    ...(params.sortOrder ? { sortOrder: params.sortOrder } : {}),
  });
  const res = await fetch(
    `${baseUrl}/api/admin/v1/membershipRequests?${queryParams.toString()}`,
  );
  if (!res.ok) throw new Error('Failed to fetch membership requests');
  return res.json();
}

export async function getRequest(params: GetRequestParams): Promise<Request> {
  const res = await fetch(
    `${baseUrl}/api/admin/v1/membershipRequests/${params.id}`,
  );
  if (!res.ok) throw new Error('Failed to fetch membership request');
  return res.json();
}

export async function updateRequestStatus(
  id: string,
  status: 'Approved' | 'Rejected',
): Promise<any> {
  const res = await fetch(`${baseUrl}/api/admin/v1/membershipRequests/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    // API expects lowercase status values ("approved" or "rejected")
    body: JSON.stringify({ status: status.toLowerCase() }),
  });
  if (!res.ok) throw new Error('Failed to update membership request status');
  return res.json();
}
