'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Member, MembersAPI } from '@/data/member';
import MemberRow from '@/components/Admin/members/MemberRow';
import EditMemberPanel from '@/components/Admin/members/EditMemberPanel';
import PaginationControls from '@/components/Admin/members/PaginationControls';
import FilterBox from '@/components/Admin/members/FilterBox';
import DropdownFilter from '@/components/Admin/members/DropdownFilter';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { dataServiceFactory } from '@/services/dataService';

export default function MembersDataTable() {
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterText, setFilterText] = useState('');
  const [ageRange, setAgeRange] = useState<[number, number] | null>(null);
  const [visibilityStatus, setVisibilityStatus] = useState<
    'visible' | 'hidden' | null
  >(null);
  const itemsPerPage = 10;
  const [membersData, setMembersData] = useState<MembersAPI | null>(null);
  const [paginatedMembers, setPaginatedMembers] = useState<Member[]>([]);

  const router = useRouter();

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchMembers(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (!membersData) return;

    const filteredMembers = membersData.data.filter(
      (member: { fullName: string; yearOfBirth: number }) => {
        const matchesText = member.fullName
          .toLowerCase()
          .includes(filterText.toLowerCase());
        const memberAge = currentYear - member.yearOfBirth;
        const matchesAge = ageRange
          ? memberAge >= ageRange[0] && memberAge <= ageRange[1]
          : true;
        const matchesVisibility = true;
        return matchesText && matchesAge && matchesVisibility;
      },
    );

    const sortedMembers = filteredMembers.sort(
      (a: { fullName: string }, b: { fullName: string }) => {
        if (sortOrder === 'asc') {
          return a.fullName.localeCompare(b.fullName);
        } else {
          return b.fullName.localeCompare(a.fullName);
        }
      },
    );

    const paginatedMembers = sortedMembers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );

    setPaginatedMembers(paginatedMembers);
  }, [filterText, ageRange, sortOrder, currentPage, membersData]);

  const fetchMembers = async (page: number, limit: number) => {
    try {
      const data = await dataServiceFactory().getMembers({
        page: page.toString(),
        limit: limit.toString(),
      });
      console.log(data);
      setMembersData(data);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!membersData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`relative transition-all ${editMember ? 'pr-[450px]' : ''} z-30`}
    >
      <div className="flex justify-between items-center mb-4 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-semibold ">
          Members (
          {`${membersData.data.length} / ${membersData.pagination.total}`})
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center"
          >
            {sortOrder === 'asc' ? (
              <>
                Asc <FaArrowUp className="inline ml-2" />
              </>
            ) : (
              <>
                Desc <FaArrowDown className="inline ml-2" />
              </>
            )}
          </button>
          <FilterBox filterText={filterText} setFilterText={setFilterText} />
          <DropdownFilter
            ageRange={ageRange}
            setAgeRange={setAgeRange}
            visibilityStatus={visibilityStatus}
            setVisibilityStatus={setVisibilityStatus}
          />
        </div>
      </div>
      {/* Data Table */}
      <div className="divide-y divide-gray-200">
        {paginatedMembers.map((member: Member) => (
          <MemberRow
            key={member._id}
            member={member}
            onEdit={() => setEditMember(member)}
            onStatus={() => {}}
            onView={() => {
              router.push(`./members/${member._id}`);
            }}
          />
        ))}
      </div>
      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(membersData.pagination.total / itemsPerPage)}
        onPageChange={handlePageChange}
      />
      {/* Side Panel for Editing */}
      {editMember && (
        <EditMemberPanel
          member={editMember}
          onClose={() => setEditMember(null)}
          onUpdated={() => setEditMember(null)}
          className="absolute top-0 -right-3 w-[450px] h-auto max-h-full rounded-xl"
        />
      )}
    </div>
  );
}
