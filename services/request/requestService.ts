import { Request, RequestsAPI } from '@/data/request';
import { GetRequestParams, GetRequestsParams } from './request.interfaces';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || './';

export async function getRequests(
  params: GetRequestsParams,
): Promise<RequestsAPI> {
  const res = await fetch(
    `${baseUrl}/api/admin/v1/requests?page=${params.page}&limit=${params.limit}${params.search ? `&search=${params.search}` : ''}${params.sortField ? `&sortField=${params.sortField}` : ''}${params.sortOrder ? `&sortOrder=${params.sortOrder}` : ''}`,
  );
  if (!res.ok) throw new Error('Failed to fetch requests');
  return res.json();
}

export async function getRequest(params: GetRequestParams): Promise<Request> {
  const res = await fetch(`${baseUrl}/api/admin/v1/requests/${params.id}`);
  if (!res.ok) throw new Error('Failed to fetch requests');
  return res.json();
}

// export async function updateMember(
//   id: string,
//   data: Partial<Member>,
// ): Promise<Member> {
//   const res = await fetch(`${baseUrl}/api/admin/v1/members/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error('Failed to update member');
//   return res.json();
// }
