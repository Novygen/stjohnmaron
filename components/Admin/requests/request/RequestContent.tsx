'use client';

import React from 'react';
import { Request } from '@/data/request';

interface RequestContentProps {
  request: Request;
  tab: string;
}

export default function RequestContent({ request, tab }: RequestContentProps) {
  if (tab === 'details') {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold mb-4">Request Details</h3>

        {/* Personal Details */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h4 className="text-xl font-semibold mb-4">Personal Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={request.personal_details.first_name}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={request.personal_details.last_name}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
            {request.personal_details.middle_name && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={request.personal_details.middle_name}
                  disabled
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* Demographic Information */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h4 className="text-xl font-semibold mb-4">
            Demographic Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="text"
                value={request.demographic_information.date_of_birth}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
            {request.demographic_information.gender && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <input
                  type="text"
                  value={request.demographic_information.gender}
                  disabled
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                value={request.contact_information.primary_email}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                value={request.contact_information.primary_phone_number}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Address Line 1
            </label>
            <input
              type="text"
              value={request.contact_information.address.line1}
              disabled
              className="mt-1 block w-full border-gray-300 rounded-md"
            />
          </div>
          {request.contact_information.address.line2 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Address Line 2
              </label>
              <input
                type="text"
                value={request.contact_information.address.line2}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                value={request.contact_information.address.city}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                value={request.contact_information.address.state}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ZIP
              </label>
              <input
                type="text"
                value={request.contact_information.address.zip}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              value={request.contact_information.address.country}
              disabled
              className="mt-1 block w-full border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h4 className="text-xl font-semibold mb-4">
            Professional Information
          </h4>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Employment Status
            </label>
            <input
              type="text"
              value={request.professional_info.employment_status.status}
              disabled
              className="mt-1 block w-full border-gray-300 rounded-md"
            />
          </div>
          {request.professional_info.employment_details && (
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  value={
                    request.professional_info.employment_details.company_name
                  }
                  disabled
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  value={request.professional_info.employment_details.job_title}
                  disabled
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Industry
                </label>
                <input
                  type="text"
                  value={request.professional_info.employment_details.industry}
                  disabled
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <input
                  type="text"
                  value={
                    request.professional_info.employment_details
                      .years_of_experience
                  }
                  disabled
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}
          {request.professional_info.employment_history && (
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Previous Occupation
                </label>
                <input
                  type="text"
                  value={
                    request.professional_info.employment_history
                      .previous_occupation
                  }
                  disabled
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mentorship Interest
                </label>
                <input
                  type="text"
                  value={
                    request.professional_info.employment_history
                      .mentorship_interest
                      ? 'Yes'
                      : 'No'
                  }
                  disabled
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}
          {request.professional_info.businesses &&
            request.professional_info.businesses.length > 0 && (
              <div className="mb-4">
                <h5 className="text-lg font-semibold mb-2">Businesses</h5>
                {request.professional_info.businesses.map((business, index) => (
                  <div key={index} className="p-4 mb-2 border rounded">
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={business.business_name}
                        disabled
                        className="mt-1 block w-full border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Business Type
                      </label>
                      <input
                        type="text"
                        value={business.business_type}
                        disabled
                        className="mt-1 block w-full border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Has Physical Store
                      </label>
                      <input
                        type="text"
                        value={business.has_physical_store ? 'Yes' : 'No'}
                        disabled
                        className="mt-1 block w-full border-gray-300 rounded-md"
                      />
                    </div>
                    {business.business_address && (
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Business Address
                        </label>
                        <input
                          type="text"
                          value={`${business.business_address.line1}, ${business.business_address.city}`}
                          disabled
                          className="mt-1 block w-full border-gray-300 rounded-md"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          {request.professional_info.service_providers &&
            request.professional_info.service_providers.length > 0 && (
              <div className="mb-4">
                <h5 className="text-lg font-semibold mb-2">
                  Service Providers
                </h5>
                {request.professional_info.service_providers.map(
                  (provider, index) => (
                    <div key={index} className="p-4 mb-2 border rounded">
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Service Name
                        </label>
                        <input
                          type="text"
                          value={provider.service_name}
                          disabled
                          className="mt-1 block w-full border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Service Details
                        </label>
                        <input
                          type="text"
                          value={provider.service_details.join(', ')}
                          disabled
                          className="mt-1 block w-full border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          {request.professional_info.students &&
            request.professional_info.students.length > 0 && (
              <div className="mb-4">
                <h5 className="text-lg font-semibold mb-2">Students</h5>
                {request.professional_info.students.map((student, index) => (
                  <div key={index} className="p-4 mb-2 border rounded">
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        School Name
                      </label>
                      <input
                        type="text"
                        value={student.school_name}
                        disabled
                        className="mt-1 block w-full border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        value={student.field_of_study}
                        disabled
                        className="mt-1 block w-full border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Expected Graduation Year
                      </label>
                      <input
                        type="text"
                        value={student.expected_graduation_year}
                        disabled
                        className="mt-1 block w-full border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>

        {/* Social Presence */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h4 className="text-xl font-semibold mb-4">Social Presence</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Personal Website
              </label>
              <input
                type="text"
                value={request.social_presence.personal_website || ''}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn Profile
              </label>
              <input
                type="text"
                value={request.social_presence.linked_in_profile || ''}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Facebook Profile
              </label>
              <input
                type="text"
                value={request.social_presence.facebook_profile || ''}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instagram Handle
              </label>
              <input
                type="text"
                value={request.social_presence.instagram_handle || ''}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Other Social Media Links
              </label>
              <input
                type="text"
                value={request.social_presence.other_social_media_links.join(
                  ', ',
                )}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Privacy Consent */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h4 className="text-xl font-semibold mb-4">Privacy Consent</h4>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={request.privacy_consent.display_in_yellow_pages}
                disabled
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-700">
                Display in Yellow Pages
              </span>
            </label>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-2">Public Visibility</h5>
            {/* Personal Details */}
            {request.privacy_consent.public_visibility.personal_details && (
              <div className="mb-2">
                <h6 className="font-medium">Personal Details</h6>
                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .personal_details.first_name || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      First Name
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .personal_details.last_name || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Last Name
                    </span>
                  </label>
                  {request.privacy_consent.public_visibility.personal_details
                    .middle_name !== undefined && (
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          request.privacy_consent.public_visibility
                            .personal_details.middle_name || false
                        }
                        disabled
                        className="form-checkbox"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Middle Name
                      </span>
                    </label>
                  )}
                </div>
              </div>
            )}
            {/* Demographic Information */}
            {request.privacy_consent.public_visibility
              .demographic_information && (
              <div className="mb-2">
                <h6 className="font-medium">Demographic Information</h6>
                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .demographic_information.date_of_birth || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Date of Birth
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .demographic_information.gender || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">Gender</span>
                  </label>
                </div>
              </div>
            )}
            {/* Contact Information */}
            {request.privacy_consent.public_visibility.contact_information && (
              <div className="mb-2">
                <h6 className="font-medium">Contact Information</h6>
                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .contact_information.primary_phone_number || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Phone Number
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .contact_information.primary_email || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">Email</span>
                  </label>
                  {request.privacy_consent.public_visibility.contact_information
                    .address && (
                    <div>
                      <h6 className="font-medium mt-2">Address</h6>
                      <div className="flex flex-wrap gap-4">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={
                              request.privacy_consent.public_visibility
                                .contact_information.address.line1 || false
                            }
                            disabled
                            className="form-checkbox"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Line 1
                          </span>
                        </label>
                        {request.privacy_consent.public_visibility
                          .contact_information.address.line2 !== undefined && (
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              checked={
                                request.privacy_consent.public_visibility
                                  .contact_information.address.line2 || false
                              }
                              disabled
                              className="form-checkbox"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Line 2
                            </span>
                          </label>
                        )}
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={
                              request.privacy_consent.public_visibility
                                .contact_information.address.city || false
                            }
                            disabled
                            className="form-checkbox"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            City
                          </span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={
                              request.privacy_consent.public_visibility
                                .contact_information.address.state || false
                            }
                            disabled
                            className="form-checkbox"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            State
                          </span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={
                              request.privacy_consent.public_visibility
                                .contact_information.address.zip || false
                            }
                            disabled
                            className="form-checkbox"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            ZIP
                          </span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={
                              request.privacy_consent.public_visibility
                                .contact_information.address.country || false
                            }
                            disabled
                            className="form-checkbox"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Country
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Professional Information */}
            {request.privacy_consent.public_visibility.professional_info && (
              <div className="mb-2">
                <h6 className="font-medium">Professional Information</h6>
                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .professional_info.employment_status || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Employment Status
                    </span>
                  </label>
                  {request.privacy_consent.public_visibility.professional_info
                    .employment_details && (
                    <>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={
                            request.privacy_consent.public_visibility
                              .professional_info.employment_details
                              .company_name || false
                          }
                          disabled
                          className="form-checkbox"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Company Name
                        </span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={
                            request.privacy_consent.public_visibility
                              .professional_info.employment_details.job_title ||
                            false
                          }
                          disabled
                          className="form-checkbox"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Job Title
                        </span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={
                            request.privacy_consent.public_visibility
                              .professional_info.employment_details.industry ||
                            false
                          }
                          disabled
                          className="form-checkbox"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Industry
                        </span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={
                            request.privacy_consent.public_visibility
                              .professional_info.employment_details
                              .years_of_experience || false
                          }
                          disabled
                          className="form-checkbox"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Experience (Years)
                        </span>
                      </label>
                    </>
                  )}
                  {request.privacy_consent.public_visibility.professional_info
                    .employment_history && (
                    <>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={
                            request.privacy_consent.public_visibility
                              .professional_info.employment_history
                              .previous_occupation || false
                          }
                          disabled
                          className="form-checkbox"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Previous Occupation
                        </span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={
                            request.privacy_consent.public_visibility
                              .professional_info.employment_history
                              .mentorship_interest || false
                          }
                          disabled
                          className="form-checkbox"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Mentorship Interest
                        </span>
                      </label>
                    </>
                  )}
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .professional_info.businesses || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Businesses
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .professional_info.service_providers || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Service Providers
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .professional_info.students || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">Students</span>
                  </label>
                </div>
              </div>
            )}
            {/* Social Presence */}
            {request.privacy_consent.public_visibility.social_presence && (
              <div className="mb-2">
                <h6 className="font-medium">Social Presence</h6>
                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .social_presence.personal_website || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Personal Website
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .social_presence.linked_in_profile || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">LinkedIn</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .social_presence.facebook_profile || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">Facebook</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .social_presence.instagram_handle || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Instagram
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        request.privacy_consent.public_visibility
                          .social_presence.other_social_media_links || false
                      }
                      disabled
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Other Links
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timestamps */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h4 className="text-xl font-semibold mb-4">Timestamps</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Submitted On
              </label>
              <input
                type="text"
                value={new Date(request.createdAt).toLocaleString()}
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Updated
              </label>
              <input
                type="text"
                value={
                  request.updatedAt
                    ? new Date(request.updatedAt).toLocaleString()
                    : 'N/A'
                }
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (tab === 'notes') {
    // Dummy notes section remains unchanged
    const dummyNotes = [
      {
        id: 1,
        author: 'Admin John',
        date: '2023-03-15 10:00 AM',
        content: 'Initial review of the membership request.',
      },
      {
        id: 2,
        author: 'Admin Jane',
        date: '2023-03-16 02:30 PM',
        content: 'Verified the submitted documents.',
      },
    ];
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold mb-4">Admin Notes</h3>
        <div className="space-y-4">
          {dummyNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Author
                  </label>
                  <input
                    type="text"
                    value={note.author}
                    disabled
                    className="mt-1 block w-full border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="text"
                    value={note.date}
                    disabled
                    className="mt-1 block w-full border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  value={note.content}
                  disabled
                  className="mt-1 block w-full border-gray-300 rounded-md"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Add Note
          </label>
          <textarea
            placeholder="Enter new note..."
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md"
            rows={3}
          />
        </div>
      </div>
    );
  } else if (tab === 'history') {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold mb-4">Request History</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Submitted On
            </label>
            <input
              type="text"
              value={new Date(request.createdAt).toLocaleString()}
              disabled
              className="mt-1 block w-full border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Updated
            </label>
            <input
              type="text"
              value={
                request.updatedAt
                  ? new Date(request.updatedAt).toLocaleString()
                  : 'N/A'
              }
              disabled
              className="mt-1 block w-full border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No content available for this tab.</div>;
  }
}
