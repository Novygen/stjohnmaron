// utils/requestsUtils.ts
import { Request } from '@/data/request';

export const filterRequests = (
  requests: Request[],
  filterText: string,
  statusFilter: 'Pending' | 'Approved' | 'Rejected' | null,
): Request[] => {
  return requests.filter((request: Request) => {
    const matchesText =
      request.personal_details.first_name
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      request.personal_details.last_name
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      request.contact_information.primary_email
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      request.contact_information.primary_phone_number
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      request.professional_info
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
      return a.personal_details.first_name.localeCompare(
        b.personal_details.first_name,
      );
    } else {
      return b.personal_details.first_name.localeCompare(
        a.personal_details.first_name,
      );
    }
  });
};
