// data/members.ts

export interface industry {
  _id: string;
  name: string;
}

export interface specialization {
  _id: string;
  name: string;
  industry: string;
}

export interface Member {
  _id: string;
  fullName: string;
  yearOfBirth: number;
  businessName?: string;
  industry: industry;
  specialization: specialization;
  jobTitle?: string;
  organization?: string;
  email: string;
  phoneNumber?: string;
  personalWebsite?: string;
  linkedIn?: string;
  shortBio?: string;
  photoUrl?: string; // for now, this can be a simple string
}
