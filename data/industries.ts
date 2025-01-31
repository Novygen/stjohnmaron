// data/industries.ts

export const industrySpecializations: Record<string, string[]> = {
  Healthcare: ['Doctor', 'Nurse', 'Therapist', 'Pharmacist', 'Dentist'],
  Education: [
    'Teacher',
    'Professor',
    'School Counselor',
    'Principal',
    'Educational Administrator',
  ],
  Finance: [
    'Accountant',
    'Financial Analyst',
    'Banker',
    'Insurance Agent',
    'Financial Planner',
  ],
  Technology: [
    'Software Engineer',
    'IT Support',
    'Data Analyst',
    'Web Developer',
    'Cybersecurity Specialist',
  ],
  Arts: ['Musician', 'Painter', 'Graphic Designer', 'Writer', 'Actor'],
  Law: ['Attorney', 'Paralegal', 'Legal Consultant', 'Judge', 'Mediator'],
  Engineering: [
    'Civil Engineer',
    'Mechanical Engineer',
    'Electrical Engineer',
    'Chemical Engineer',
    'Environmental Engineer',
  ],
  Business: [
    'Entrepreneur',
    'Marketing Manager',
    'Sales Executive',
    'Human Resources Specialist',
    'Business Analyst',
  ],
  Hospitality: [
    'Chef',
    'Hotel Manager',
    'Event Planner',
    'Travel Consultant',
    'Catering Specialist',
  ],
};

export const industries = Object.keys(industrySpecializations);
