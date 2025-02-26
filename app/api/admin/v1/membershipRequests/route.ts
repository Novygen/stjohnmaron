import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import MembershipRequest from '@/models/MembershipRequest';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    // Default sort by first name from personal_details; adjust as needed.
    const sortField =
      searchParams.get('sortField') || 'personal_details.first_name';
    // Use 1 for ascending and -1 for descending.
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const searchQuery = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Build search criteria using the nested fields.
    let searchCriteria = {};
    if (searchQuery) {
      searchCriteria = {
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
      };
    }

    const total = await MembershipRequest.countDocuments(searchCriteria);
    const data = await MembershipRequest.find(searchCriteria)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      data,
      pagination: { total, page, limit },
    });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
