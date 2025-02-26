// /api/admin/v1/membershipRequests/requestToMember/[id]
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import MembershipRequest from '@/models/MembershipRequest';
import Member, { IMember } from '@/models/Member';
import { Industry } from '@/models/Industry';
import { Specialization } from '@/models/Specialization';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await req.json();
    const { approved } = body; // expecting: { approved: true } or { approved: false }

    // Find the membership request.
    const membershipRequest = await MembershipRequest.findById(id);
    if (!membershipRequest) {
      return NextResponse.json(
        { message: 'Membership request not found' },
        { status: 404 },
      );
    }

    // If already actioned, return error.
    if (membershipRequest.isActioned) {
      return NextResponse.json(
        { message: 'User is already actioned' },
        { status: 400 },
      );
    }

    // If approved, convert membership request into a full Member.
    if (approved === true) {
      // Process Professional Info:
      // - For employmentDetails: look up or create the Specialization document
      //   based on the provided specialization string.
      let employmentDetailsArr = [];
      let businessesArr = [];
      let studentArr = [];

      const profInfo = membershipRequest.professionalInfo;

      // Process employmentDetails (if present)
      if (profInfo.employmentDetails) {
        const empDet = profInfo.employmentDetails;
        // For this conversion, we use a default Industry (e.g. "General") if none is provided.
        const defaultIndustryName = 'General';
        let industry = await Industry.findOne({ name: defaultIndustryName });
        if (!industry) {
          industry = await Industry.create({ name: defaultIndustryName });
        }
        // Lookup or create the Specialization document using the provided specialization string.
        let specialization = await Specialization.findOne({
          name: empDet.specialization,
          industry: industry._id,
        });
        if (!specialization) {
          specialization = await Specialization.create({
            name: empDet.specialization,
            industry: industry._id,
          });
        }
        employmentDetailsArr.push({
          companyName: empDet.companyName,
          jobTitle: empDet.jobTitle,
          specialization: specialization._id,
          startDate: empDet.startDate,
        });
      }

      // Process business (if present)
      if (profInfo.business) {
        const biz = profInfo.business;
        // Lookup Industry for the business using the provided industry string.
        let bizIndustry = await Industry.findOne({ name: biz.industry });
        if (!bizIndustry) {
          bizIndustry = await Industry.create({ name: biz.industry });
        }
        businessesArr.push({
          businessName: biz.businessName,
          additionalInformation: biz.additionalInformation,
          website: biz.website,
          phoneNumber: biz.phoneNumber,
          industry: bizIndustry._id,
        });
      }

      // Process student (if present)
      if (profInfo.student) {
        studentArr.push(profInfo.student);
      }

      // Construct the new professionalInfo for the Member.
      const newProfessionalInfo = {
        employmentDetails: employmentDetailsArr,
        ownsBusinessOrService: profInfo.ownsBusinessOrService || false,
        businesses: businessesArr,
        student: studentArr,
      };

      // Map basic fields from the membership request into the new Member.
      const memberData: Partial<IMember> = {
        memberLogin: membershipRequest.memberLogin,
        personalDetails: membershipRequest.personalDetails,
        contactInformation: membershipRequest.contactInformation,
        socialPresence: membershipRequest.socialPresence,
        privacyConsent: membershipRequest.privacyConsent,
        isActive: true,
        professionalInfo: newProfessionalInfo,
      };

      await Member.create(memberData);
    }

    // Mark the membership request as actioned.
    membershipRequest.isActioned = true;
    await membershipRequest.save();

    return NextResponse.json(
      {
        message: approved
          ? 'Membership request approved and member created'
          : 'Membership request declined and actioned',
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
