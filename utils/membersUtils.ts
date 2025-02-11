import { Member } from '@/data/member';

export const filterMembers = (
  members: Member[],
  filterText: string,
  ageRange: [number, number] | null,
  currentYear: number,
): Member[] => {
  return members.filter((member: { fullName: string; yearOfBirth: number }) => {
    const matchesText = member.fullName
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const memberAge = currentYear - member.yearOfBirth;
    const matchesAge = ageRange
      ? memberAge >= ageRange[0] && memberAge <= ageRange[1]
      : true;
    const matchesVisibility = true;
    return matchesText && matchesAge && matchesVisibility;
  });
};

export const sortMembers = (
  members: Member[],
  sortOrder: 'asc' | 'desc',
): Member[] => {
  return members.sort((a: { fullName: string }, b: { fullName: string }) => {
    if (sortOrder === 'asc') {
      return a.fullName.localeCompare(b.fullName);
    } else {
      return b.fullName.localeCompare(a.fullName);
    }
  });
};
