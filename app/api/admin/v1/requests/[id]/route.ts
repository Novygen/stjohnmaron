// app/api/admin/v1/requests/[id]/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongoose';
import { RequestModel } from '@/models/Request';
import { Member } from '@/models/Member';

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  try {
    const params = await req.body;
    console.log(params);
    await connectToDatabase();
    const body = await req.body;
    const { status } = body; // expecting "approved" or "declined"

    const requestDoc = await RequestModel.findById(params.id);
    if (!requestDoc) {
      return res.status(404).json({ message: 'Request not found' });
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

    return res.status(200).json({ message: `Request ${status}` });
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}
