import { Request } from '@/data/request';

export const filterRequests = (
  requests: Request[],
  filterText: string,
  statusFilter: 'Pending' | 'Approved' | 'Rejected' | null,
): Request[] => {
  return requests.filter((request: Request) => {
    const matchesText =
      request.fullName.toLowerCase().includes(filterText.toLowerCase()) ||
      request.email.toLowerCase().includes(filterText.toLowerCase()) ||
      request.industry.toLowerCase().includes(filterText.toLowerCase());

    const matchesStatus = statusFilter ? request.status === statusFilter : true;

    return matchesText && matchesStatus;
  });
};

export const sortRequests = (
  requests: Request[],
  sortOrder: 'asc' | 'desc',
): Request[] => {
  return requests.sort((a: { fullName: string }, b: { fullName: string }) => {
    if (sortOrder === 'asc') {
      return a.fullName.localeCompare(b.fullName);
    } else {
      return b.fullName.localeCompare(a.fullName);
    }
  });
};
