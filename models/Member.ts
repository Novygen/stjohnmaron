// models/Member.ts
import { Schema, model, models } from 'mongoose';

const MemberSchema = new Schema(
  {
    fullName: { type: String, required: true },
    yearOfBirth: { type: Number },
    businessName: { type: String },
    industry: { type: Schema.Types.ObjectId, ref: 'Industry' },
    specialization: { type: Schema.Types.ObjectId, ref: 'Specialization' },
    jobTitle: { type: String },
    organization: { type: String },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    personalWebsite: { type: String },
    linkedIn: { type: String },
    shortBio: { type: String },
    subscribeNewsletter: { type: Boolean, default: false },
    consentShare: { type: Boolean, default: false },
    consentDisplay: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Member = models.Member || model('Member', MemberSchema);
