import { Member } from '@/data/members';

export const filterMembers = (
  members: Member[],
  filterText: string,
  ageRange: [number, number] | null,
): Member[] => {
  return members.filter((member: Member) => {
    const fullName =
      `${member.personalDetails.firstName} ${member.personalDetails.lastName}`.toLowerCase();
    const matchesText = fullName.includes(filterText.toLowerCase());

    let matchesAge = true;
    if (ageRange) {
      // Expecting ageRange string in format "min-max"
      const ageParts = member.personalDetails.ageRange.split('-').map(Number);
      if (ageParts.length === 2 && !isNaN(ageParts[0]) && !isNaN(ageParts[1])) {
        const [memberMin, memberMax] = ageParts;
        const [filterMin, filterMax] = ageRange;
        // Check for overlapping ranges: memberMax >= filterMin && memberMin <= filterMax
        matchesAge = memberMax >= filterMin && memberMin <= filterMax;
      } else {
        // if parsing fails, do not match
        matchesAge = false;
      }
    }

    const matchesVisibility = true; // Adjust if additional visibility filtering is needed
    return matchesText && matchesAge && matchesVisibility;
  });
};

export const sortMembers = (
  members: Member[],
  sortOrder: 'asc' | 'desc',
): Member[] => {
  return members.sort((a: Member, b: Member) => {
    const aFullName = `${a.personalDetails.firstName} ${a.personalDetails.lastName}`;
    const bFullName = `${b.personalDetails.firstName} ${b.personalDetails.lastName}`;
    return sortOrder === 'asc'
      ? aFullName.localeCompare(bFullName)
      : bFullName.localeCompare(aFullName);
  });
};
