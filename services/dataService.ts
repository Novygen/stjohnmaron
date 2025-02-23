import { Member, MembersAPI } from '@/data/member';
import { GetMemberParams, GetMembersParams } from './member/member.interfaces';
import { getMembers, getMember, updateMember } from './member/memberService';
import {
  GetRequestParams,
  GetRequestsParams,
} from './request/request.interfaces';
import { RequestsAPI, Request } from '@/data/request';
import { getRequest, getRequests } from './request/requestService';

export interface IDataService {
  getMembers: (params: GetMembersParams) => Promise<MembersAPI>;
  getMember: (params: GetMemberParams) => Promise<Member>;
  getRequests: (params: GetRequestsParams) => Promise<RequestsAPI>;
  getRequest: (params: GetRequestParams) => Promise<Request>;
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

  async getRequests(params: GetRequestsParams): Promise<RequestsAPI> {
    return getRequests(params);
  }

  async getRequest(params: GetRequestParams): Promise<Request> {
    return getRequest(params);
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
