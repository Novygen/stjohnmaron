import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Member from '@/models/Member';
import { Specialization } from '@/models/Specialization';
import { Industry } from '@/models/Industry';

type tParams = Promise<{ id: string }>;

/**
 * Manually populates a member for public display.
 * - Removes sensitive fields (address and ageRange).
 * - Removes primaryPhoneNumber if displayPhonePublicly is false.
 * - For each employment detail, replaces the specialization ObjectId with { _id, name }.
 * - For each business, replaces the industry ObjectId with { _id, name }.
 */
async function manuallyPopulatePublicMember(memberDoc: any) {
  const member = memberDoc.toObject();

  // Remove sensitive fields.
  if (member.contactInformation && member.contactInformation.address) {
    delete member.contactInformation.address;
  }
  if (member.personalDetails && member.personalDetails.ageRange) {
    delete member.personalDetails.ageRange;
  }
  // Remove phone number if not allowed.
  if (
    member.privacyConsent &&
    member.privacyConsent.displayPhonePublicly === false
  ) {
    if (member.contactInformation) {
      delete member.contactInformation.primaryPhoneNumber;
    }
  }

  // Manually populate each employment detail's specialization.
  if (
    member.professionalInfo &&
    Array.isArray(member.professionalInfo.employmentDetails)
  ) {
    for (let emp of member.professionalInfo.employmentDetails) {
      if (emp.specialization) {
        const spec = await Specialization.findById(emp.specialization).select(
          'name',
        );
        emp.specialization = spec
          ? { _id: emp.specialization, name: spec.name }
          : emp.specialization;
      }
    }
  }
  // Manually populate each business's industry.
  if (
    member.professionalInfo &&
    Array.isArray(member.professionalInfo.businesses)
  ) {
    for (let biz of member.professionalInfo.businesses) {
      if (biz.industry) {
        const ind = await Industry.findById(biz.industry).select('name');
        biz.industry = ind
          ? { _id: biz.industry, name: ind.name }
          : biz.industry;
      }
    }
  }
  return member;
}

/**
 * GET /api/public/members/[id]
 * Returns a public member (if they consent to be displayed) with sensitive fields removed.
 */
export async function GET(req: NextRequest, { params }: { params: tParams }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    // Ensure we return only members that consent to display
    const memberDoc = await Member.findOne({
      _id: id,
      'privacyConsent.displayInYellowPages': true,
    });
    if (!memberDoc) {
      return NextResponse.json(
        { message: 'Member not found or not public.' },
        { status: 404 },
      );
    }
    const member = await manuallyPopulatePublicMember(memberDoc);
    return NextResponse.json({ data: member });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
