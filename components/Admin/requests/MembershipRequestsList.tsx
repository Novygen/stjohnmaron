'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Request, RequestsAPI } from '@/data/request';
import RequestRow from '@/components/Admin/requests/RequestRow';
import PaginationControls from '@/components/Admin/requests/PaginationControls';
import FilterBox from '@/components/Admin/requests/FilterBox';
import DropdownFilter from '@/components/Admin/requests/DropdownFilter';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { dataServiceFactory } from '@/services/dataService';
import { filterRequests, sortRequests } from '@/utils/requestsUtils';

export default function MembershipRequestsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<
    'Pending' | 'Approved' | 'Rejected' | null
  >(null);
  const [searchText, setSearchText] = useState('');
  const itemsPerPage = 10;
  const [requestsData, setRequestsData] = useState<RequestsAPI | null>(null);
  const router = useRouter();

  const fetchRequests = useCallback(
    async (page: number, limit: number, search: string, sortOrder: string) => {
      try {
        const data = await dataServiceFactory().getRequests({
          page: page.toString(),
          limit: limit.toString(),
          search: search,
          sortField: 'personalDetails.firstName',
          sortOrder: sortOrder,
        });
        setRequestsData(data);
      } catch (error) {
        console.error('Failed to fetch membership requests:', error);
      }
    },
    [],
  );

  useEffect(() => {
    fetchRequests(currentPage, itemsPerPage, searchText, sortOrder);
  }, [currentPage, itemsPerPage, searchText, sortOrder, fetchRequests]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortOrderChange = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  if (!requestsData) {
    return <div>Loading...</div>;
  }

  const filteredRequests = filterRequests(
    requestsData.data,
    searchText,
    statusFilter,
  );
  const sortedRequests = sortRequests(filteredRequests, sortOrder);

  return (
    <div className="relative transition-all w-full z-30">
      <div className="flex justify-between items-center mb-4 bg-white rounded-lg shadow-md p-4">
        <h2 className="md:text-2xl font-semibold">
          Requests (
          {`${requestsData.data.length} / ${requestsData.pagination.total}`})
        </h2>
        <div className="flex space-x-4">
          <span className="hidden md:block">
            <FilterBox filterText={searchText} setFilterText={setSearchText} />
          </span>
          <button
            onClick={handleSortOrderChange}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Sort{' '}
            {sortOrder === 'asc' ? (
              <FaArrowUp className="inline ml-2" />
            ) : (
              <FaArrowDown className="inline ml-2" />
            )}
          </button>
          <DropdownFilter
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {sortedRequests.map((request: Request) => (
          <RequestRow
            key={request._id}
            request={request}
            onView={() => router.push(`/admin/requests/${request._id}`)}
          />
        ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(requestsData.pagination.total / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
