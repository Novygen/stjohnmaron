import React from 'react';
import { Member } from '@/data/member';

interface MemberContentProps {
  member: Member;
  tab: string;
}

export default function MemberContent({ member, tab }: MemberContentProps) {
  const renderTabContent = () => {
    switch (tab) {
      case 'About':
        return (
          <>
            <h3 className="text-lg font-semibold">About {member.fullName}</h3>
            <p className="mt-2 text-gray-700">
              {member.shortBio || 'No bio available.'}
            </p>
          </>
        );
      case 'Employment':
        return (
          <div>
            <h3 className="text-lg font-semibold">
              {member.fullName}&apos;s Employment
            </h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-600">Industry</h4>
                <p className="text-gray-800">
                  {member.industry?.name || 'N/A'}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">
                  Specialization
                </h4>
                <p className="text-gray-800">
                  {member.specialization?.name || 'N/A'}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">
                  Organization
                </h4>
                <p className="text-gray-800">{member.organization || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">Job Title</h4>
                <p className="text-gray-800">{member.jobTitle || 'N/A'}</p>
              </div>
            </div>
          </div>
        );
      case 'Businesses':
        return (
          <div>
            <h3 className="text-lg font-semibold">Businesses</h3>
            <p className="mt-2 text-gray-700">No businesses available.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="mt-4">{renderTabContent()}</div>
    </div>
  );
}
