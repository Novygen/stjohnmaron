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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase.client';
import { useRouter } from 'next/navigation';

interface RequestItem {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  status: 'pending' | 'approved' | 'declined';
  createdAt: string;
  // ... other fields
}

export default function RequestsPage() {
  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(
    null,
  );
  const [openModal, setOpenModal] = useState(false);

  // If user is not logged in, redirect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        router.replace('/admin');
      } else {
        setIsAuthChecking(false);
        fetchRequests();
      }
    });
    return () => unsubscribe();
  }, [router, page]);

  if (isAuthChecking) {
    return <div>Loading...</div>;
  }

  async function fetchRequests() {
    try {
      const res = await axios.get('/api/admin/v1/requests', {
        params: {
          page,
          limit,
        },
      });
      setRequests(res.data.data);
      setTotal(res.data.pagination.total);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  }

  function handleOpenModal(request: RequestItem) {
    setSelectedRequest(request);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
    setSelectedRequest(null);
  }

  async function handleAction(status: 'approved' | 'declined') {
    if (!selectedRequest) return;

    try {
      await axios.patch(`/api/admin/v1/requests/${selectedRequest._id}`, {
        status,
      });
      // Refresh list
      fetchRequests();
      handleCloseModal();
    } catch (error) {
      console.error(`Failed to ${status} request:`, error);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">All Membership Requests</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Submitted</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req._id}>
                <TableCell>{req.fullName}</TableCell>
                <TableCell>{req.email}</TableCell>
                <TableCell>{req.status}</TableCell>
                <TableCell>
                  {new Date(req.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenModal(req)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination controls (basic) */}
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

      {/* Modal for request details */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Request Details</DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <div className="space-y-2">
              <p>
                <strong>Full Name:</strong> {selectedRequest.fullName}
              </p>
              <p>
                <strong>Email:</strong> {selectedRequest.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRequest.phoneNumber}
              </p>
              {/* Additional fields: businessName, industry, specialization, etc. */}
              {/* Example:
                  <p><strong>Business Name:</strong> {selectedRequest.businessName}</p>
                  ...
              */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAction('approved')} color="success">
            Approve
          </Button>
          <Button onClick={() => handleAction('declined')} color="error">
            Decline
          </Button>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
