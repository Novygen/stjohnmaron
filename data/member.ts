// data/member.ts
import { Industry } from './industry';
import { Specialization } from './specialization';

export interface Member {
  _id: string;
  fullName: string;
  yearOfBirth: number;
  businessName?: string;
  industry: Industry;
  specialization: Specialization;
  jobTitle?: string;
  organization?: string;
  email: string;
  phoneNumber?: string;
  personalWebsite?: string;
  linkedIn?: string;
  shortBio?: string;
  photoUrl?: string;
}

export interface MembersAPI {
  data: Member[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}
