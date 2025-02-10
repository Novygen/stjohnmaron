import { Member, MembersAPI } from '@/data/member';
import { GetMemberParams, GetMembersParams } from './member/member.interfaces';
import { getMembers, getMember, updateMember } from './member/memberService';

export interface IDataService {
  getMembers: (params: GetMembersParams) => Promise<MembersAPI>;
  getMember: (params: GetMemberParams) => Promise<Member>;
  getRequests: () => Promise<Member[]>; // Assume membership requests follow the same interface
  updateMember: (id: string, data: Partial<Member>) => Promise<Member>;
  updateRequestStatus: (
    id: string,
    status: 'Approved' | 'Rejected',
  ) => Promise<any>;
}

class DataService implements IDataService {
  private baseUrl: string;

  constructor() {
    // The base URL can be configured via environment variables
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || './';
  }

  async getMembers(params: GetMembersParams): Promise<MembersAPI> {
    return getMembers(params);
  }

  async getMember(params: GetMemberParams): Promise<Member> {
    console.log('params:', params);
    return getMember(params);
  }

  async getRequests(): Promise<Member[]> {
    const res = await fetch(`${this.baseUrl}/api/admin/v1/requests`);
    if (!res.ok) throw new Error('Failed to fetch requests');
    return res.json();
  }

  async updateMember(id: string, data: Partial<Member>): Promise<Member> {
    return updateMember(id, data);
  }

  async updateRequestStatus(
    id: string,
    status: 'Approved' | 'Rejected',
  ): Promise<any> {
    const res = await fetch(
      `${this.baseUrl}/api/admin/v1/requests/${id}/status`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      },
    );
    if (!res.ok) throw new Error('Failed to update request status');
    return res.json();
  }
}

export function dataServiceFactory(): IDataService {
  return new DataService();
}
