// models/Specialization.ts
import { Schema, model, models } from 'mongoose';

const SpecializationSchema = new Schema(
  {
    name: { type: String, required: true },
    // Link back to Industry, optional if you prefer
    industry: { type: Schema.Types.ObjectId, ref: 'Industry' },
  },
  { timestamps: true },
);

export const Specialization =
  models.Specialization || model('Specialization', SpecializationSchema);
