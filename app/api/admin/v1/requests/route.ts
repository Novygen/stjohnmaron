/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const statusFilter = searchParams.get('status'); // e.g. pending, approved, declined
    const sortField = searchParams.get('sortField') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'desc' ? -1 : 1;

    const query: any = {};
    if (statusFilter) {
      query.status = statusFilter; // e.g. ?status=pending
    }

    const skip = (page - 1) * limit;

    const total = await RequestModel.countDocuments(query);
    const data = await RequestModel.find(query)
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
