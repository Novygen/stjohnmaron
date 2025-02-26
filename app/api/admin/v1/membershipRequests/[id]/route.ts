import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import MembershipRequest from '@/models/MembershipRequest';

// Define asynchronous params type
type tParams = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: tParams }) {
  const { id } = await params;
  try {
    await connectToDatabase();

    const membershipRequest = await MembershipRequest.findById(id);
    if (!membershipRequest) {
      return NextResponse.json(
        { message: 'MembershipRequest not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(membershipRequest, { status: 200 });
  } catch (error) {
    console.error(`GET /membershipRequests/${id} failed:`, error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: tParams }) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const body = await req.json();
    // Expecting a payload with "status": "approved" or "declined"
    const { status } = body;
    if (!['approved', 'declined'].includes(status)) {
      return NextResponse.json(
        { message: 'Invalid status value' },
        { status: 400 },
      );
    }

    const membershipRequest = await MembershipRequest.findById(id);
    if (!membershipRequest) {
      return NextResponse.json(
        { message: 'MembershipRequest not found' },
        { status: 404 },
      );
    }

    // Update the isApproved field: true if approved, false otherwise.
    membershipRequest.isApproved = status === 'approved';
    await membershipRequest.save();

    return NextResponse.json(
      { message: `MembershipRequest ${status}` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
