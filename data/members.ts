// /data/members.ts

export interface Member {
  _id: string;
  memberLogin: {
    uid: string;
  };
  personalDetails: {
    firstName: string;
    lastName: string;
    middleName?: string;
    ageRange: string;
    bio?: string;
  };
  contactInformation: {
    primaryPhoneNumber: string;
    primaryEmail: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  socialPresence: {
    personalWebsite?: string;
    linkedInProfile?: string;
    facebookProfile?: string;
    instagramHandle?: string;
  };
  privacyConsent: {
    internalConsent: boolean;
    displayInYellowPages: boolean;
    displayPhonePublicly: boolean;
  };
  professionalInfo: {
    employmentDetails: {
      companyName: string;
      jobTitle: string;
      // this is typically a reference, but for UI we assume a string value is displayed
      specialization: string;
      startDate: string; // Format: "MM/YYYY"
    }[];
    ownsBusinessOrService?: boolean;
    businesses?: {
      businessName: string;
      additionalInformation: string;
      website: string;
      phoneNumber: string;
      // industry now is stored as a reference – here we display as a string name
      industry: string;
    }[];
    student?: {
      schoolName: string;
      fieldOfStudy: string;
      expectedGraduationYear: number;
    }[];
  };
  isActive: boolean;
  softDeleted?: boolean;
  lastModifiedBy?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface MembersAPI {
  data: Member[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}
