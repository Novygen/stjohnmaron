// app/api/admin/v1/members/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Member } from '@/models/Member';

export async function GET(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  try {
    await connectToDatabase();
    const member = await Member.findById(params.id)
      .populate('industry')
      .populate('specialization');
    if (!member) {
      return NextResponse.json(
        { message: 'Member not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(member, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  try {
    await connectToDatabase();
    const body = await req.json();
    const updatedMember = await Member.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    if (!updatedMember) {
      return NextResponse.json(
        { message: 'Member not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(updatedMember);
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } },
) {
  const { params } = context;
  try {
    await connectToDatabase();
    const deleted = await Member.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json(
        { message: 'Member not found' },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: 'Member deleted' });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
