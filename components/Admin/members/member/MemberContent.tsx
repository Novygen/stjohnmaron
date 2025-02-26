'use client';

import React from 'react';
import { Member } from '@/data/members';

interface MemberContentProps {
  member: Member;
  tab: string;
}

export default function MemberContent({
  member,
  tab = 'About',
}: MemberContentProps) {
  // Helper to render disabled input fields
  const DisabledInput = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        disabled
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );

  const renderDetails = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-4">Member Details</h3>

      {/* Personal Details */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h4 className="text-xl font-semibold mb-4">Personal Details</h4>
        <DisabledInput
          label="First Name"
          value={member.personalDetails.firstName}
        />
        <DisabledInput
          label="Last Name"
          value={member.personalDetails.lastName}
        />
        {member.personalDetails.middleName && (
          <DisabledInput
            label="Middle Name"
            value={member.personalDetails.middleName}
          />
        )}
        <DisabledInput
          label="Age Range"
          value={member.personalDetails.ageRange}
        />
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
        <DisabledInput
          label="Email"
          value={member.contactInformation.primaryEmail}
        />
        <DisabledInput
          label="Phone Number"
          value={member.contactInformation.primaryPhoneNumber}
        />
        <DisabledInput
          label="Address Line 1"
          value={member.contactInformation.address.line1}
        />
        {member.contactInformation.address.line2 && (
          <DisabledInput
            label="Address Line 2"
            value={member.contactInformation.address.line2}
          />
        )}
        <DisabledInput
          label="City"
          value={member.contactInformation.address.city}
        />
        <DisabledInput
          label="State"
          value={member.contactInformation.address.state}
        />
        <DisabledInput
          label="ZIP"
          value={member.contactInformation.address.zip}
        />
        <DisabledInput
          label="Country"
          value={member.contactInformation.address.country}
        />
      </div>

      {/* Professional Information */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h4 className="text-xl font-semibold mb-4">Professional Information</h4>
        {member.professionalInfo.employmentDetails &&
          member.professionalInfo.employmentDetails.map((emp, idx) => (
            <div key={idx} className="mb-4 p-4 border rounded-md">
              <DisabledInput label="Company Name" value={emp.companyName} />
              <DisabledInput label="Job Title" value={emp.jobTitle} />
              {/* If populated, specialization may be an object with a name */}
              <DisabledInput
                label="Specialization"
                value={
                  typeof emp.specialization === 'object'
                    ? (emp.specialization as any).name || ''
                    : emp.specialization.toString()
                }
              />
              <DisabledInput label="Start Date" value={emp.startDate} />
            </div>
          ))}
        {member.professionalInfo.businesses &&
          member.professionalInfo.businesses.map((biz, idx) => (
            <div key={idx} className="mb-4 p-4 border rounded-md">
              <DisabledInput label="Business Name" value={biz.businessName} />
              <DisabledInput
                label="Additional Info"
                value={biz.additionalInformation}
              />
              <DisabledInput label="Website" value={biz.website} />
              <DisabledInput label="Phone" value={biz.phoneNumber} />
              <DisabledInput
                label="Industry"
                value={
                  typeof biz.industry === 'object'
                    ? (biz.industry as any).name || ''
                    : biz.industry.toString()
                }
              />
            </div>
          ))}
        {member.professionalInfo.student &&
          member.professionalInfo.student.map((stud, idx) => (
            <div key={idx} className="mb-4 p-4 border rounded-md">
              <DisabledInput label="School Name" value={stud.schoolName} />
              <DisabledInput label="Field of Study" value={stud.fieldOfStudy} />
              <DisabledInput
                label="Expected Graduation Year"
                value={stud.expectedGraduationYear.toString()}
              />
            </div>
          ))}
      </div>

      {/* Social Presence */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h4 className="text-xl font-semibold mb-4">Social Presence</h4>
        <DisabledInput
          label="Personal Website"
          value={member.socialPresence.personalWebsite || ''}
        />
        <DisabledInput
          label="LinkedIn Profile"
          value={member.socialPresence.linkedInProfile || ''}
        />
        <DisabledInput
          label="Facebook Profile"
          value={member.socialPresence.facebookProfile || ''}
        />
        <DisabledInput
          label="Instagram Handle"
          value={member.socialPresence.instagramHandle || ''}
        />
      </div>

      {/* Privacy Consent */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h4 className="text-xl font-semibold mb-4">Privacy Consent</h4>
        <DisabledInput
          label="Internal Consent"
          value={member.privacyConsent.internalConsent ? 'Yes' : 'No'}
        />
        <DisabledInput
          label="Display in Yellow Pages"
          value={member.privacyConsent.displayInYellowPages ? 'Yes' : 'No'}
        />
        <DisabledInput
          label="Display Phone Publicly"
          value={member.privacyConsent.displayPhonePublicly ? 'Yes' : 'No'}
        />
      </div>

      {/* Timestamps */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h4 className="text-xl font-semibold mb-4">Timestamps</h4>
        <DisabledInput
          label="Created At"
          value={new Date(member.createdAt).toLocaleString()}
        />
        <DisabledInput
          label="Last Updated"
          value={
            member.updatedAt
              ? new Date(member.updatedAt).toLocaleString()
              : 'N/A'
          }
        />
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (tab) {
      case 'About':
        return renderDetails();
      case 'Notes':
        return (
          <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Admin Notes</h3>
            <p className="text-gray-700">No notes available.</p>
            <textarea
              disabled
              placeholder="Add note (disabled for now)"
              className="mt-4 w-full p-2 border border-gray-300 rounded-md bg-gray-50"
              rows={3}
            />
          </div>
        );
      case 'History':
        return (
          <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
            <h3 className="text-2xl font-bold mb-4">History</h3>
            <DisabledInput
              label="Created At"
              value={new Date(member.createdAt).toLocaleString()}
            />
            <DisabledInput
              label="Last Updated"
              value={
                member.updatedAt
                  ? new Date(member.updatedAt).toLocaleString()
                  : 'N/A'
              }
            />
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="p-4">{renderTabContent()}</div>;
}
