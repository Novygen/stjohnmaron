import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Member from '@/models/Member';
import { Specialization } from '@/models/Specialization';
import { Industry } from '@/models/Industry';

// Helper to manually populate an array of members
async function manuallyPopulateMembers(membersDocs: any[]) {
  return Promise.all(membersDocs.map((doc) => manuallyPopulateMember(doc)));
}

async function manuallyPopulateMember(memberDoc: any) {
  const member = memberDoc.toObject();

  if (
    member.professionalInfo &&
    Array.isArray(member.professionalInfo.employmentDetails)
  ) {
    for (let emp of member.professionalInfo.employmentDetails) {
      if (emp.specialization) {
        const spec = await Specialization.findById(emp.specialization).select(
          'name',
        );
        emp.specialization = spec ? spec.name : emp.specialization;
      }
    }
  }
  if (
    member.professionalInfo &&
    Array.isArray(member.professionalInfo.businesses)
  ) {
    for (let biz of member.professionalInfo.businesses) {
      if (biz.industry) {
        const ind = await Industry.findById(biz.industry).select('name');
        biz.industry = ind ? ind.name : biz.industry;
      }
    }
  }
  return member;
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sortField =
      searchParams.get('sortField') || 'personalDetails.firstName';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const searchQuery = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Use nested keys for searching
    const searchCriteria = searchQuery
      ? {
          $or: [
            {
              'personalDetails.firstName': {
                $regex: searchQuery,
                $options: 'i',
              },
            },
            {
              'personalDetails.lastName': {
                $regex: searchQuery,
                $options: 'i',
              },
            },
            {
              'contactInformation.primaryEmail': {
                $regex: searchQuery,
                $options: 'i',
              },
            },
          ],
        }
      : {};

    const total = await Member.countDocuments(searchCriteria);
    const membersDocs = await Member.find(searchCriteria)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    const data = await manuallyPopulateMembers(membersDocs);
    return NextResponse.json({
      data,
      pagination: { total, page, limit },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}

// Create new member (if needed from admin)
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newMember = await Member.create(body);
    const populatedMember = await manuallyPopulateMember(newMember);
    return NextResponse.json(populatedMember, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
