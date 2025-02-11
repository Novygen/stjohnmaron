// app/api/community/submit/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { RequestModel } from '@/models/Request';
import { Industry } from '@/models/Industry';
import { Specialization } from '@/models/Specialization';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // 1) Handle Industry
    let industryId = null;
    if (body.industryId) {
      // User selected an existing Industry ID
      industryId = body.industryId;
    } else if (body.industryName) {
      // User typed a new Industry name
      let newIndustry = await Industry.findOne({ name: body.industryName });
      if (!newIndustry) {
        newIndustry = await Industry.create({ name: body.industryName });
      }
      industryId = newIndustry._id;
    }

    // 2) Handle Specialization
    let specializationId = null;
    if (body.specializationId) {
      // Existing specialization
      specializationId = body.specializationId;
    } else if (body.specializationName) {
      // New specialization
      let newSpec = await Specialization.findOne({
        name: body.specializationName,
        industry: industryId,
      });
      if (!newSpec) {
        newSpec = await Specialization.create({
          name: body.specializationName,
          industry: industryId,
        });
      }
      specializationId = newSpec._id;
    }

    // 3) Create Request in "pending" status
    const newRequest = await RequestModel.create({
      fullName: body.fullName,
      yearOfBirth: body.yearOfBirth,
      businessName: body.businessName,
      industry: industryId,
      specialization: specializationId,
      jobTitle: body.jobTitle,
      organization: body.organization,
      email: body.email,
      phoneNumber: body.phoneNumber,
      personalWebsite: body.personalWebsite,
      linkedIn: body.linkedIn,
      shortBio: body.shortBio,
      subscribeNewsletter: !!body.subscribeNewsletter,
      consentShare: !!body.consentShare,
      consentDisplay: !!body.consentDisplay,
      // status defaults to "pending"
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating request:', error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
