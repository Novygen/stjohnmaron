export interface GetMembersParams {
  page: string;
  limit: string;
  sortField?: string;
  sortOrder?: string;
  search?: string;
}

export interface GetMemberParams {
  id: string;
}
