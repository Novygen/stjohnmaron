import { Member, MembersAPI } from '@/data/members';
import { GetMemberParams, GetMembersParams } from './member/member.interfaces';
import { getMembers, getMember, updateMember } from './member/memberService';

import {
  GetRequestParams,
  GetRequestsParams,
} from './request/request.interfaces';
import {
  getRequest,
  getRequests,
  updateRequestStatus,
} from './request/requestService';
import { Request, RequestsAPI } from '@/data/request';

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
  async getMembers(params: GetMembersParams): Promise<MembersAPI> {
    return getMembers(params);
  }

  async getMember(params: GetMemberParams): Promise<Member> {
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
    return updateRequestStatus(id, status);
  }
}

export function dataServiceFactory(): IDataService {
  return new DataService();
}
