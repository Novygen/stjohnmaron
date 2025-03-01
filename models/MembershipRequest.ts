// models/MembershipRequest.ts
import mongoose, { Document, Schema } from 'mongoose';

// Login information
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

export interface IMembershipRequest extends Document {
  createdAt: string | number | Date;
  updatedAt: any;
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
}

const MembershipRequestSchema = new Schema<IMembershipRequest>(
  {
    memberLogin: { type: Object, required: true },
    personalDetails: { type: Object, required: true },
    contactInformation: { type: Object, required: true },
    professionalInfo: { type: Object, required: true },
    socialPresence: { type: Object, required: true },
    privacyConsent: { type: Object, required: true },
    isApproved: { type: Boolean, default: false },
    isActioned: { type: Boolean, default: false },
    softDeleted: { type: Boolean, default: false },
    lastModifiedBy: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.MembershipRequest ||
  mongoose.model<IMembershipRequest>(
    'MembershipRequest',
    MembershipRequestSchema,
  );
