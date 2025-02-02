'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase.client';
import { useRouter } from 'next/navigation';

interface MemberItem {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // If user is not logged in, redirect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        router.replace('/admin');
      } else {
        setIsAuthChecking(false);
        fetchMembers();
      }
    });
    return () => unsubscribe();
  }, [router, page]);

  if (isAuthChecking) {
    return <div>Loading...</div>;
  }

  async function fetchMembers() {
    try {
      const res = await axios.get('/api/admin/v1/members', {
        params: { page, limit },
      });
      setMembers(res.data.data);
      setTotal(res.data.pagination.total);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">All Community Members</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Joined</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member._id}>
                <TableCell>{member.fullName}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  {new Date(member.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Simple pagination controls */}
      <div className="mt-4 flex gap-2">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </Button>
        <span>
          Page {page} of {Math.ceil(total / limit)}
        </span>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page * limit >= total}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
