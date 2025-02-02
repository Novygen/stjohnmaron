// utils/validation.ts

import { z } from 'zod';

export const submissionSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full Name must be at least 2 characters')
    .regex(/^[a-zA-Z\s.,'-]+$/, 'Full Name contains invalid characters'),
  yearOfBirth: z
    .string()
    .transform((val) => parseInt(val))
    .refine(
      (val) =>
        !isNaN(val) && val >= 1900 && val <= new Date().getFullYear() - 18,
      {
        message:
          'Year of Birth must be a valid year and you must be at least 18 years old',
      },
    ),
  businessName: z.string().optional(),
  preferredName: z
    .string()
    .regex(/^[a-zA-Z\s.,'-]*$/, 'Preferred Name contains invalid characters')
    .optional(),
  photo: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return (
          file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/jpg'
        );
      },
      { message: 'Only JPG and PNG formats are allowed' },
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024;
      },
      { message: 'Maximum file size is 5MB' },
    ),
  industry: z.string().optional(),
  specialization: z.string().optional(),
  jobTitle: z.string().optional(),
  organization: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .regex(
      /^(\+?\d{1,3}[- ]?)?\d{10}$/,
      'Phone number must be 10 digits, optionally prefixed with country code',
    )
    .optional(),
  linkedIn: z.string().url('Invalid URL format').optional(),
  personalWebsite: z.string().url('Invalid URL format').optional(),
  shortBio: z
    .string()
    .min(100, 'Short Bio must be at least 100 characters')
    .max(500, 'Short Bio must be at most 500 characters'),
  areasOfExpertise: z
    .array(z.string())
    .optional()
    .refine((arr) => arr && arr.length > 0, {
      message: 'Select at least one area of expertise',
    }),
  interests: z.string().optional(),
  profileVisibility: z.enum(['Public', 'Private'], {
    errorMap: () => ({ message: 'Profile Visibility is required' }),
  }),
  consentShare: z.boolean().refine((val) => val === true, {
    message: 'You must consent to share your information with us',
  }),
  consentDisplay: z.boolean().refine((val) => val === true, {
    message: 'You must consent to display your information on the site',
  }),
  subscribeNewsletter: z.boolean().optional(),
});
