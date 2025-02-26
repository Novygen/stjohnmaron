import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Member from '@/models/Member';
import { Specialization } from '@/models/Specialization';
import { Industry } from '@/models/Industry';

/**
 * Manually populates a member for public display.
 * - Removes the address and ageRange.
 * - If displayPhonePublicly is false, removes the phone number.
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
 * GET /api/public/members
 * Returns all members who consented to be displayed on the yellow pages,
 * without addresses or age range, and with phone number returned only if allowed.
 * Also, each employment detail's specialization and each business's industry are manually populated.
 */
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    // Find members with displayInYellowPages true.
    const membersDocs = await Member.find({
      'privacyConsent.displayInYellowPages': true,
    });
    // Manually populate each member.
    const members = await Promise.all(
      membersDocs.map((doc) => manuallyPopulatePublicMember(doc)),
    );
    return NextResponse.json({ data: members });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
