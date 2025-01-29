// data/members.ts

export interface Member {
  id: number; // Using numeric ID (instead of slug)
  name: string;
  industry: string;
  specialization: string;
  bio: string;
  contactEmail?: string; // Optional
  contactPhone?: string; // Optional
  photoUrl?: string;
}

// Example: mapping from industry → specialization array
export const industrySpecializations: Record<string, string[]> = {
  Healthcare: ['Doctor', 'Nurse', 'Therapist', 'Pharmacist'],
  Education: ['Teacher', 'Professor', 'School Counselor', 'Principal'],
  Finance: ['Accountant', 'Financial Analyst', 'Banker', 'Insurance Agent'],
  Technology: [
    'Project Manager',
    'Software Engineer',
    'IT Support',
    'Data Analyst',
    'Web Developer',
  ],
  Arts: ['Musician', 'Painter', 'Graphic Designer', 'Writer'],
};

export const industries = Object.keys(industrySpecializations);

// Sample data
export const members: Member[] = [
  {
    id: 0,
    name: 'Joelle Harika',
    industry: 'Technology',
    specialization: 'Project Manager',
    bio: 'Joelle is a project manager...',
    contactEmail: 'joelle@example.com',
    contactPhone: '555-555-5555',
    photoUrl: '/images/members/avatar.jpg',
  },
  {
    id: 7,
    name: 'Elio Gerges',
    industry: 'Technology',
    specialization: 'Software Engineer',
    bio: 'Elio is a software engineer...',
    contactEmail: 'elio@example.com',
    contactPhone: '555-555-5555',
    photoUrl: '/images/members/avatar.jpg',
  },
  {
    id: 8,
    name: 'Joey Ragheb',
    industry: 'Technology',
    specialization: 'Software Engineer',
    bio: 'Joey is a software engineer...',
    contactEmail: 'joey@example.com',
    photoUrl: '/images/members/avatar.jpg',
  },
  {
    id: 9,
    name: 'Anthony Shara',
    industry: 'Technology',
    specialization: 'Project Manager',
    bio: 'Anthony is a project manager...',
    contactEmail: 'anthony@example.com',
    photoUrl: '/images/members/avatar.jpg',
  },
  {
    id: 1,
    name: 'Dr. John Doe',
    industry: 'Healthcare',
    specialization: 'Doctor',
    bio: 'Dr. John Doe has been a parishioner...',
    contactEmail: 'johndoe@example.com',
    photoUrl: '/images/members/avatar.jpg',
  },
  {
    id: 2,
    name: 'Mary Smith',
    industry: 'Education',
    specialization: 'Teacher',
    bio: 'Mary teaches elementary school...',
    contactEmail: 'marysmith@example.com',
    photoUrl: '/images/members/avatar.jpg',
  },
  {
    id: 3,
    name: 'Paul Jones',
    industry: 'Finance',
    specialization: 'Accountant',
    bio: 'Paul has been working in finance...',
    contactEmail: 'pauljones@example.com',
    photoUrl: '/images/members/avatar.jpg',
  },
  {
    id: 4,
    name: 'Lisa Chen',
    industry: 'Technology',
    specialization: 'Web Developer',
    bio: 'Lisa is a web developer...',
    contactEmail: 'lisa@example.com',
    photoUrl: '/images/members/avatar.jpg',
  },
  {
    id: 5,
    name: 'David Lee',
    industry: 'Arts',
    specialization: 'Musician',
    bio: 'David is a talented musician...',
    contactEmail: 'david@example.com',
    photoUrl: '/images/members/avatar.jpg',
  },
  {
    id: 6,
    name: 'Jane Brown',
    industry: 'Healthcare',
    specialization: 'Nurse',
    bio: 'Jane is a dedicated nurse...',
    contactEmail: 'jane@example.com',
    photoUrl: '/images/members/avatar.jpg',
  },
];
