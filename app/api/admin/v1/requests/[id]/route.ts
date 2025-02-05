// app/api/admin/v1/requests/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { RequestModel } from '@/models/Request';
import { Member } from '@/models/Member';

interface Params {
  id: string;
}

interface ContextParams {
  params: Params;
}

export async function PATCH(req: Request, context: ContextParams) {
  try {
    const { params } = context;
    await connectToDatabase();
    const body = await req.json();
    const { status } = body; // expecting "approved" or "declined"

    const requestDoc = await RequestModel.findById(params.id);
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
