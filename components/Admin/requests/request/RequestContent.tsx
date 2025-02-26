'use client';

import React from 'react';
import { Request } from '@/data/request';

interface RequestContentProps {
  membershipRequest: Request;
  tab: string;
}

export default function RequestContent({
  membershipRequest,
  tab,
}: RequestContentProps) {
  if (tab === 'details') {
    return (
      <div className="space-y-6">
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
                value={membershipRequest.personalDetails.firstName}
                disabled
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={membershipRequest.personalDetails.lastName}
                disabled
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {membershipRequest.personalDetails.middleName && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={membershipRequest.personalDetails.middleName}
                  disabled
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Age Range
            </label>
            <input
              type="text"
              value={membershipRequest.personalDetails.ageRange}
              disabled
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
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
                value={membershipRequest.contactInformation.primaryEmail}
                disabled
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                value={membershipRequest.contactInformation.primaryPhoneNumber}
                disabled
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Address Line 1
            </label>
            <input
              type="text"
              value={membershipRequest.contactInformation.address.line1}
              disabled
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {membershipRequest.contactInformation.address.line2 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Address Line 2
              </label>
              <input
                type="text"
                value={membershipRequest.contactInformation.address.line2}
                disabled
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                value={membershipRequest.contactInformation.address.city}
                disabled
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                value={membershipRequest.contactInformation.address.state}
                disabled
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ZIP
              </label>
              <input
                type="text"
                value={membershipRequest.contactInformation.address.zip}
                disabled
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              value={membershipRequest.contactInformation.address.country}
              disabled
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              value={membershipRequest.professionalInfo.employmentStatus.status}
              disabled
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {membershipRequest.professionalInfo.employmentDetails && (
            <>
              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={
                      membershipRequest.professionalInfo.employmentDetails
                        .companyName
                    }
                    disabled
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={
                      membershipRequest.professionalInfo.employmentDetails
                        .jobTitle
                    }
                    disabled
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div></div>
                <label className="block text-sm font-medium text-gray-700">
                  Specialization
                </label>
                <input
                  type="text"
                  value={
                    membershipRequest.professionalInfo.employmentDetails
                      .specialization
                  }
                  disabled
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="text"
                  value={
                    membershipRequest.professionalInfo.employmentDetails
                      .startDate
                  }
                  disabled
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}
          {membershipRequest.professionalInfo.business && (
            <div className="mb-4 p-4 border rounded">
              <h5 className="text-lg font-semibold mb-2">Business</h5>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  type="text"
                  value={
                    membershipRequest.professionalInfo.business.businessName
                  }
                  disabled
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Information
                </label>
                <input
                  type="text"
                  value={
                    membershipRequest.professionalInfo.business
                      .additionalInformation
                  }
                  disabled
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="text"
                  value={membershipRequest.professionalInfo.business.website}
                  disabled
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={
                    membershipRequest.professionalInfo.business.phoneNumber
                  }
                  disabled
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Industry
                </label>
                <input
                  type="text"
                  value={membershipRequest.professionalInfo.business.industry}
                  disabled
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
          {membershipRequest.professionalInfo.student && (
            <div className="mb-4 p-4 border rounded">
              <h5 className="text-lg font-semibold mb-2">Student Details</h5>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  School Name
                </label>
                <input
                  type="text"
                  value={membershipRequest.professionalInfo.student.schoolName}
                  disabled
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={
                    membershipRequest.professionalInfo.student.fieldOfStudy
                  }
                  disabled
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expected Graduation Year
                </label>
                <input
                  type="text"
                  value={
                    membershipRequest.professionalInfo.student
                      .expectedGraduationYear
                  }
                  disabled
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
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
                value={membershipRequest.socialPresence.personalWebsite || ''}
                disabled
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn Profile
              </label>
              <input
                type="text"
                value={membershipRequest.socialPresence.linkedInProfile || ''}
                disabled
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Facebook Profile
              </label>
              <input
                type="text"
                value={membershipRequest.socialPresence.facebookProfile || ''}
                disabled
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instagram Handle
              </label>
              <input
                type="text"
                value={membershipRequest.socialPresence.instagramHandle || ''}
                disabled
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Privacy Consent */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h4 className="text-xl font-semibold mb-4">Privacy Consent</h4>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={membershipRequest.privacyConsent.displayInYellowPages}
                disabled
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-700">
                Display in Yellow Pages
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={membershipRequest.privacyConsent.displayPhonePublicly}
                disabled
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-700">
                Display Phone Publicly
              </span>
            </label>
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
                value={new Date(membershipRequest.createdAt).toLocaleString()}
                disabled
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Updated
              </label>
              <input
                type="text"
                value={
                  membershipRequest.updatedAt
                    ? new Date(membershipRequest.updatedAt).toLocaleString()
                    : 'N/A'
                }
                disabled
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (tab === 'notes') {
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
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              value={new Date(membershipRequest.createdAt).toLocaleString()}
              disabled
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Updated
            </label>
            <input
              type="text"
              value={
                membershipRequest.updatedAt
                  ? new Date(membershipRequest.updatedAt).toLocaleString()
                  : 'N/A'
              }
              disabled
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No content available for this tab.</div>;
  }
}
