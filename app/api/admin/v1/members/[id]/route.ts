import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Member from '@/models/Member';
import { Industry } from '@/models/Industry';
import { Specialization } from '@/models/Specialization';

// Helper function to manually populate a single member's professional info
async function manuallyPopulateMember(memberDoc: any) {
  const member = memberDoc.toObject();

  // Populate each employment detail's specialization name
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
  // Populate each business's industry name
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

/**
 * GET: Retrieves a member by ID, manually populating referenced fields.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const memberDoc = await Member.findById(id);
    if (!memberDoc) {
      return NextResponse.json(
        { message: 'Member not found' },
        { status: 404 },
      );
    }
    const member = await manuallyPopulateMember(memberDoc);
    return NextResponse.json(member, { status: 200 });
  } catch (error) {
    console.error(`GET /members/${id} failed:`, error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}

/**
 * PATCH: Updates a member by ID. Manual population is applied on the updated document.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const body = await req.json();
    const updatedDoc = await Member.findByIdAndUpdate(id, body, { new: true });
    if (!updatedDoc) {
      return NextResponse.json(
        { message: 'Member not found' },
        { status: 404 },
      );
    }
    const updatedMember = await manuallyPopulateMember(updatedDoc);
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
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await connectToDatabase();
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
