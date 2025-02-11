export interface Request {
  _id: number;
  fullName: string;
  email: string;
  yearOfBirth: number;
  industry: string;
  specialization: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

export interface RequestsAPI {
  data: Request[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}
