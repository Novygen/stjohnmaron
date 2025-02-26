export interface IMemberLogin {
  uid: string;
}

export interface IPersonalDetails {
  firstName: string;
  lastName: string;
  middleName?: string;
  ageRange: string;
}

export interface IAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface IContactInformation {
  primaryPhoneNumber: string;
  primaryEmail: string;
  address: IAddress;
}

export interface IEmploymentStatus {
  status: string;
}

export interface IEmploymentDetails {
  companyName: string;
  jobTitle: string;
  specialization: string;
  startDate: string; // Format: "MM/YYYY"
}

export interface IBusiness {
  businessName: string;
  additionalInformation: string;
  website: string;
  phoneNumber: string;
  industry: string;
}

export interface IStudent {
  schoolName: string;
  fieldOfStudy: string;
  expectedGraduationYear: number;
}

export interface IProfessionalInfo {
  employmentStatus: IEmploymentStatus;
  employmentDetails?: IEmploymentDetails;
  ownsBusinessOrService?: boolean;
  business?: IBusiness;
  student?: IStudent;
}

export interface ISocialPresence {
  personalWebsite?: string;
  linkedInProfile?: string;
  facebookProfile?: string;
  instagramHandle?: string;
}

export interface IPrivacyConsent {
  internalConsent: boolean;
  displayInYellowPages: boolean;
  displayPhonePublicly: boolean;
}

export interface Request {
  _id: string;
  memberLogin: IMemberLogin;
  personalDetails: IPersonalDetails;
  contactInformation: IContactInformation;
  professionalInfo: IProfessionalInfo;
  socialPresence: ISocialPresence;
  privacyConsent: IPrivacyConsent;
  isApproved: boolean;
  isActioned: boolean;
  softDeleted?: boolean;
  lastModifiedBy?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface RequestsAPI {
  data: Request[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}
