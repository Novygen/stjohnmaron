import mongoose, { Document, Schema } from 'mongoose';

// Sub-interfaces for basic member data
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

// Sub-interfaces for professional info
export interface IEmploymentDetails {
  companyName: string;
  jobTitle: string;
  specialization: mongoose.Types.ObjectId;
  startDate: string; // Format: "MM/YYYY"
}

export interface IBusiness {
  businessName: string;
  additionalInformation: string;
  website: string;
  phoneNumber: string;
  industry: mongoose.Types.ObjectId;
}

export interface IStudent {
  schoolName: string;
  fieldOfStudy: string;
  expectedGraduationYear: number;
}

export interface IProfessionalInfo {
  employmentDetails: IEmploymentDetails[];
  ownsBusinessOrService?: boolean;
  businesses?: IBusiness[];
  student?: IStudent[];
}

// Main Member interface
export interface IMember extends Document {
  memberLogin: IMemberLogin;
  personalDetails: IPersonalDetails;
  contactInformation: IContactInformation;
  socialPresence: ISocialPresence;
  privacyConsent: IPrivacyConsent;
  professionalInfo: IProfessionalInfo;
  isActive: boolean;
  softDeleted?: boolean;
  lastModifiedBy?: string;
}

const MemberSchema = new Schema<IMember>(
  {
    memberLogin: { type: Object, required: true },
    personalDetails: { type: Object, required: true },
    contactInformation: { type: Object, required: true },
    socialPresence: { type: Object, required: true },
    privacyConsent: { type: Object, required: true },
    professionalInfo: { type: Object, required: true },
    isActive: { type: Boolean, default: false },
    softDeleted: { type: Boolean, default: false },
    lastModifiedBy: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Member ||
  mongoose.model<IMember>('Member', MemberSchema);
