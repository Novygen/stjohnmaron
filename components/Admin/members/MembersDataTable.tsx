'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import MemberRow from '@/components/Admin/members/MemberRow';
import PaginationControls from '@/components/Admin/members/PaginationControls';
import FilterBox from '@/components/Admin/members/FilterBox';
import DropdownFilter from '@/components/Admin/members/DropdownFilter';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { dataServiceFactory } from '@/services/dataService';
import { filterMembers, sortMembers } from '@/utils/membersUtils';
import { Member, MembersAPI } from '@/data/members';

export default function MembersDataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [ageRange, setAgeRange] = useState<[number, number] | null>(null);
  const [visibilityStatus, setVisibilityStatus] = useState<
    'visible' | 'hidden' | null
  >(null);
  const [searchText, setSearchText] = useState('');
  const itemsPerPage = 10;
  const [membersData, setMembersData] = useState<MembersAPI | null>(null);

  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const fetchMembers = useCallback(
    async (page: number, limit: number, search: string, sortOrder: string) => {
      try {
        const data = await dataServiceFactory().getMembers({
          page: page.toString(),
          limit: limit.toString(),
          search: search,
          sortField: 'personalDetails.firstName',
          sortOrder: sortOrder,
        });
        console.log('Fetched members data:', data);
        setMembersData(data);
      } catch (error) {
        console.error('Failed to fetch members:', error);
      }
    },
    [],
  );

  useEffect(() => {
    fetchMembers(currentPage, itemsPerPage, searchText, sortOrder);
  }, [currentPage, itemsPerPage, searchText, sortOrder, fetchMembers]);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSortOrderChange = () =>
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));

  if (!membersData) {
    return <div>Loading...</div>;
  }

  const filteredMembers = filterMembers(membersData.data, searchText, ageRange);
  const sortedMembers = sortMembers(filteredMembers, sortOrder);

  return (
    <div className="relative transition-all w-full z-30">
      <div className="flex justify-between items-center mb-4 bg-white rounded-lg shadow-md p-4">
        <h2 className="md:text-2xl font-semibold">
          Members (
          {`${membersData.data.length} / ${membersData.pagination.total}`})
        </h2>
        <div className="flex space-x-4">
          <span className="hidden md:block">
            <FilterBox filterText={searchText} setFilterText={setSearchText} />
          </span>
          <button
            onClick={handleSortOrderChange}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center"
          >
            Sort{' '}
            {sortOrder === 'asc' ? (
              <FaArrowUp className="inline ml-2" />
            ) : (
              <FaArrowDown className="inline ml-2" />
            )}
          </button>
          <DropdownFilter
            ageRange={ageRange}
            setAgeRange={setAgeRange}
            visibilityStatus={visibilityStatus}
            setVisibilityStatus={setVisibilityStatus}
          />
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {sortedMembers.map((member: Member) => (
          <MemberRow
            key={member._id}
            member={member}
            onView={() => router.push(`./members/${member._id}`)}
          />
        ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(membersData.pagination.total / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
