// models/Request.ts
import { Schema, model, models } from 'mongoose';

/**
 * status: pending -> default
 *          approved -> if admin approves
 *          declined -> if admin declines
 */
const RequestSchema = new Schema(
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
    consentShare: { type: Boolean, default: false }, // e.g., "consent to share info"
    consentDisplay: { type: Boolean, default: false }, // e.g., "consent to display on site"
    status: {
      type: String,
      enum: ['pending', 'approved', 'declined'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const RequestModel = models.Request || model('Request', RequestSchema);
