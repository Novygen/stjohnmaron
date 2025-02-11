'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Request, RequestsAPI } from '@/data/request';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { dataServiceFactory } from '@/services/dataService';
import { filterRequests, sortRequests } from '@/utils/requestsUtils';
import DropdownFilter from './DropdownFilter';
import RequestRow from './RequestRow';
import PaginationControls from '../PaginationControls';
import EditRequestPanel from './EditRequestPanel';
import FilterBox from './FilterBox';

export default function RequestsDataTable() {
  const [editRequest, setEditRequest] = useState<Request | null>(null);
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
          sortField: 'fullName',
          sortOrder: sortOrder,
        });
        console.log('Fetched requests data:', data);
        setRequestsData(data);
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      }
    },
    [],
  );

  useEffect(() => {
    fetchRequests(currentPage, itemsPerPage, searchText, sortOrder);
  }, [currentPage, itemsPerPage, searchText, fetchRequests]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortOrderChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
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
    <div
      className={`relative transition-all w-full ${editRequest ? 'pr-[450px]' : ''} z-30`}
    >
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
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center"
          >
            Sort
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
      {/* Data Table */}
      <div className="divide-y divide-gray-200">
        {sortedRequests.map((request: Request) => (
          <RequestRow
            key={request._id}
            request={request}
            onEdit={() => setEditRequest(request)}
            onView={() => {
              router.push(`./requests/${request._id}`);
            }}
            onStatus={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        ))}
      </div>
      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(requestsData.pagination.total / itemsPerPage)}
        onPageChange={handlePageChange}
      />
      {/* Side Panel for Editing */}
      {editRequest && (
        <EditRequestPanel
          request={editRequest}
          onClose={() => setEditRequest(null)}
          onUpdated={() => setEditRequest(null)}
          className="absolute top-0 -right-3 w-[450px] h-auto max-h-full rounded-xl"
        />
      )}
    </div>
  );
}
