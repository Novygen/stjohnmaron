// app/api/admin/v1/requests/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { RequestModel } from '@/models/Request';
import { Member } from '@/models/Member';

// Define asynchronous params type
type tParams = Promise<{ id: string }>;

/**
 * GET: Retrieves a member by ID.
 */
export async function GET(req: NextRequest, { params }: { params: tParams }) {
  const { id } = await params; // Await the params promise to extract the ID
  try {
    // Ensure the database connection is established
    await connectToDatabase();

    // Query for the request and populate the industry and specialization names
    const request = await RequestModel.findById(id).populate([
      {
        path: 'Industry',
        strictPopulate: false,
      },
      {
        path: 'Specialization',
        strictPopulate: false,
      },
    ]);

    if (!request) {
      return NextResponse.json(
        { message: 'Request not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(request, { status: 200 });
  } catch (error) {
    // Log error details if needed and return a clean error message
    console.error(`GET /requests/${id} failed:`, error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: tParams }) {
  try {
    const { id } = await params; // Await the params promise to extract the ID
    await connectToDatabase();
    const body = await req.json();
    const { status } = body; // expecting "approved" or "declined"

    const requestDoc = await RequestModel.findById(id);
    if (!requestDoc) {
      return NextResponse.json(
        { message: 'Request not found' },
        { status: 404 },
      );
    }

    // If user wants to approve
    if (status === 'approved') {
      // Create a new Member record
      await Member.create({
        fullName: requestDoc.fullName,
        yearOfBirth: requestDoc.yearOfBirth,
        businessName: requestDoc.businessName,
        industry: requestDoc.industry, // references Industry _id
        specialization: requestDoc.specialization, // references Specialization _id
        jobTitle: requestDoc.jobTitle,
        organization: requestDoc.organization,
        email: requestDoc.email,
        phoneNumber: requestDoc.phoneNumber,
        personalWebsite: requestDoc.personalWebsite,
        linkedIn: requestDoc.linkedIn,
        shortBio: requestDoc.shortBio,
        subscribeNewsletter: requestDoc.subscribeNewsletter,
        consentShare: requestDoc.consentShare,
        consentDisplay: requestDoc.consentDisplay,
      });
    }

    // Update request status
    requestDoc.status = status;
    await requestDoc.save();

    return NextResponse.json({ message: `Request ${status}` }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
