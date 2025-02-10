import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Member } from '@/models/Member';

// Define asynchronous params type
type tParams = Promise<{ id: string }>;

/**
 * GET: Retrieves a member by ID.
 */
export async function GET(req: NextRequest, { params }: { params: tParams }) {
  const { id } = await params; // Await the params promise to extract the ID
  try {
    // Ensure the database connection is established
    await connectToDatabase();

    // Query for the member and populate the industry and specialization names
    console.log('id:', id);
    const member = await Member.findById(id).populate([
      {
        path: 'Industry',
        strictPopulate: false,
      },
      {
        path: 'Specialization',
        strictPopulate: false,
      },
    ]);

    if (!member) {
      return NextResponse.json(
        { message: 'Member not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(member, { status: 200 });
  } catch (error) {
    // Log error details if needed and return a clean error message
    console.error(`GET /members/${id} failed:`, error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}

/**
 * PATCH: Updates a member by ID.
 */
export async function PATCH(req: NextRequest, { params }: { params: tParams }) {
  const { id } = await params;
  try {
    await connectToDatabase();

    // Read the JSON body containing the update payload
    const body = await req.json();

    // Update the member and populate referenced fields in one query
    const updatedMember = await Member.findByIdAndUpdate(id, body, {
      new: true,
    })
      .populate('industry', 'name')
      .populate('specialization', 'name');

    if (!updatedMember) {
      return NextResponse.json(
        { message: 'Member not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedMember, { status: 200 });
  } catch (error) {
    console.error(`PATCH /members/${id} failed:`, error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}

/**
 * DELETE: Deletes a member by ID.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: tParams },
) {
  const { id } = await params;
  try {
    await connectToDatabase();

    // Delete the member document by ID
    const deleted = await Member.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { message: 'Member not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: 'Member deleted' }, { status: 200 });
  } catch (error) {
    console.error(`DELETE /members/${id} failed:`, error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
