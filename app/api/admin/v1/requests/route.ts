// app/api/admin/v1/requests/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { RequestModel } from '@/models/Request';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sortField = searchParams.get('sortField') || 'fullName';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? -1 : 1;
    const searchQuery = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    const searchCriteria = searchQuery
      ? {
          $or: [
            { fullName: { $regex: searchQuery, $options: 'i' } },
            { email: { $regex: searchQuery, $options: 'i' } },
            // Add other fields to search here
          ],
        }
      : {};

    const total = await RequestModel.countDocuments(searchCriteria);
    const data = await RequestModel.find(searchCriteria)
      .populate([
        {
          path: 'Industry',
          strictPopulate: false,
        },
        {
          path: 'Specialization',
          strictPopulate: false,
        },
      ])
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      data,
      pagination: {
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
