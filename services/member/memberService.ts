import { Member, MembersAPI } from '@/data/member';
import { GetMemberParams, GetMembersParams } from './member.interfaces';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || './';

export async function getMembers(
  params: GetMembersParams,
): Promise<MembersAPI> {
  const res = await fetch(
    `${baseUrl}/api/admin/v1/members?page=${params.page}&limit=${params.limit}${params.search ? `&search=${params.search}` : ''}${params.sortField ? `&sortField=${params.sortField}` : ''}${params.sortOrder ? `&sortOrder=${params.sortOrder}` : ''}`,
  );
  if (!res.ok) throw new Error('Failed to fetch members');
  return res.json();
}

export async function getMember(params: GetMemberParams): Promise<Member> {
  const res = await fetch(`${baseUrl}/api/admin/v1/members/${params.id}`);
  if (!res.ok) throw new Error('Failed to fetch members');
  return res.json();
}

export async function updateMember(
  id: string,
  data: Partial<Member>,
): Promise<Member> {
  const res = await fetch(`${baseUrl}/api/admin/v1/members/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update member');
  return res.json();
}
