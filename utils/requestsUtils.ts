// utils/requestsUtils.ts
import { Request } from '@/data/request';

export const filterRequests = (
  requests: Request[],
  filterText: string,
  statusFilter: 'Pending' | 'Approved' | 'Rejected' | null,
): Request[] => {
  return requests.filter((request: Request) => {
    const matchesText =
      request.personalDetails.firstName
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      request.personalDetails.lastName
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      request.contactInformation.primaryEmail
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      request.contactInformation.primaryPhoneNumber
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      request.professionalInfo.employmentDetails?.companyName
        .toLowerCase()
        .includes(filterText.toLowerCase());

    const matchesStatus = statusFilter
      ? statusFilter === 'Approved'
        ? request.isApproved === true
        : request.isApproved === false
      : true;

    return matchesText && matchesStatus;
  });
};

export const sortRequests = (
  requests: Request[],
  sortOrder: 'asc' | 'desc',
): Request[] => {
  return requests.sort((a: Request, b: Request) => {
    if (sortOrder === 'asc') {
      return a.personalDetails.firstName.localeCompare(
        b.personalDetails.firstName,
      );
    } else {
      return b.personalDetails.firstName.localeCompare(
        a.personalDetails.firstName,
      );
    }
  });
};
