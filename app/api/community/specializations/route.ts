/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Specialization } from '@/models/Specialization';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const industryId = searchParams.get('industryId') || null;

    const query: any = {};
    if (industryId) {
      query.industry = industryId;
    }

    const specializations = await Specialization.find(query).sort({ name: 1 });
    return NextResponse.json(specializations);
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
