// app/api/community/industries/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Industry } from '@/models/Industry';

export async function GET() {
  try {
    await connectToDatabase();
    const industries = await Industry.find().sort({ name: 1 });
    return NextResponse.json(industries);
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
