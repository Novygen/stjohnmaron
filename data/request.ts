export interface IMemberLogin {
  uid: string;
}

export interface IPersonalDetails {
  first_name: string;
  last_name: string;
  middle_name?: string;
}

export interface IDemographicInformation {
  date_of_birth: string;
  gender?: string;
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
  primary_phone_number: string;
  primary_email: string;
  address: IAddress;
}

export interface IEmploymentStatus {
  status: string;
}

export interface IEmploymentDetails {
  company_name: string;
  job_title: string;
  industry: string;
  years_of_experience: number;
}

export interface IEmploymentHistory {
  previous_occupation: string;
  mentorship_interest: boolean;
}

export interface IBusiness {
  business_name: string;
  business_type: string;
  has_physical_store: boolean;
  business_address: IAddress;
}

export interface IServiceProvider {
  service_name: string;
  service_details: string[];
}

export interface IStudent {
  school_name: string;
  field_of_study: string;
  expected_graduation_year: number;
}

export interface IProfessionalInfo {
  employment_status: IEmploymentStatus;
  employment_details?: IEmploymentDetails;
  employment_history?: IEmploymentHistory;
  businesses?: IBusiness[];
  service_providers?: IServiceProvider[];
  students?: IStudent[];
}

export interface ISocialPresence {
  personal_website?: string;
  linked_in_profile?: string;
  facebook_profile?: string;
  instagram_handle?: string;
  other_social_media_links: string[];
}

// New structured privacy consent interface
export interface IPrivacyConsent {
  display_in_yellow_pages: boolean;
  public_visibility: {
    personal_details?: {
      first_name?: boolean;
      last_name?: boolean;
      middle_name?: boolean;
    };
    demographic_information?: {
      date_of_birth?: boolean;
      gender?: boolean;
    };
    contact_information?: {
      primary_phone_number?: boolean;
      primary_email?: boolean;
      address?: {
        line1?: boolean;
        line2?: boolean;
        city?: boolean;
        state?: boolean;
        zip?: boolean;
        country?: boolean;
      };
    };
    professional_info?: {
      employment_status?: boolean;
      employment_details?: {
        company_name?: boolean;
        job_title?: boolean;
        industry?: boolean;
        years_of_experience?: boolean;
      };
      employment_history?: {
        previous_occupation?: boolean;
        mentorship_interest?: boolean;
      };
      businesses?: boolean;
      service_providers?: boolean;
      students?: boolean;
    };
    social_presence?: {
      personal_website?: boolean;
      linked_in_profile?: boolean;
      facebook_profile?: boolean;
      instagram_handle?: boolean;
      other_social_media_links?: boolean;
    };
  };
}

export interface Request {
  _id: string;
  member_login: IMemberLogin;
  personal_details: IPersonalDetails;
  demographic_information: IDemographicInformation;
  contact_information: IContactInformation;
  professional_info: IProfessionalInfo;
  social_presence: ISocialPresence;
  privacy_consent: IPrivacyConsent;
  isApproved: boolean;
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
