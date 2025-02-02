/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

// ---------------------------------
// OPTIONAL: Example placeholders
// Replace with your actual components
// ---------------------------------
function HeaderBanner() {
  return (
    <div className="bg-blue-300 text-white p-4 mb-4">
      <h1 className="text-2xl">Join Our Community Directory</h1>
    </div>
  );
}

function Introduction() {
  return (
    <div className="p-4 mb-4">
      <p>Share your information with our parish community.</p>
    </div>
  );
}

function PrivacyStatement() {
  return (
    <div className="p-4 my-4 bg-gray-100">
      <p>
        Your information will be handled with care and only published with your
        consent.
      </p>
    </div>
  );
}

function SubmissionConfirmation() {
  return (
    <div className="p-4 text-green-700">
      <h2 className="text-xl font-semibold mb-2">
        Thank you for your submission!
      </h2>
      <p>
        We have received your request. Our parish team will review it shortly.
      </p>
    </div>
  );
}
// ---------------------------------

// ---------------------------------
// 1) Zod Schema for validation
// You can modify fields as needed.
// ---------------------------------
const submissionSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  yearOfBirth: z
    .number()
    .optional()
    .or(z.string().regex(/^\d+$/, 'Year must be numeric').optional())
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
    .refine((val) => !val || (val >= 1900 && val <= new Date().getFullYear()), {
      message: 'Invalid year of birth',
    })
    .optional(),
  businessName: z.string().optional(),
  // We'll store either an ID or new text for industry/specialization,
  // but we won't require it in Zod if you want partial logic
  // For strict logic, you'd do something like .min(1) if required
  industry: z.string().optional(),
  specialization: z.string().optional(),
  jobTitle: z.string().optional(),
  organization: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional(),
  linkedIn: z.string().optional(),
  personalWebsite: z.string().optional(),
  shortBio: z.string().min(1, 'Short Bio is required'),
  subscribeNewsletter: z.boolean().optional(),
  consentShare: z.boolean().optional(),
  consentDisplay: z.boolean().optional(),
});

type FormData = z.infer<typeof submissionSchema>;

// Data types for fetching from the server
interface IndustryType {
  _id: string;
  name: string;
}
interface SpecializationType {
  _id: string;
  name: string;
  industry?: string;
}

// ---------------------------------
// 2) The main page: shows the form or the confirmation
// ---------------------------------
export default function RequestMembershipPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsSubmitted(true);
  };

  return (
    <>
      <HeaderBanner />
      <Introduction />
      {!isSubmitted ? (
        <SubmissionForm onSuccess={handleSuccess} />
      ) : (
        <SubmissionConfirmation />
      )}
      <PrivacyStatement />
    </>
  );
}

// ---------------------------------
// 3) Submission Form Component
// ---------------------------------
function SubmissionForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(submissionSchema),
  });

  // 3.1 Local state for MUI Autocomplete
  const [industryOptions, setIndustryOptions] = useState<IndustryType[]>([]);
  const [specOptions, setSpecOptions] = useState<SpecializationType[]>([]);

  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | null>(
    null,
  );
  const [industryInput, setIndustryInput] = useState('');

  const [selectedSpec, setSelectedSpec] = useState<SpecializationType | null>(
    null,
  );
  const [specInput, setSpecInput] = useState('');

  const [loadingIndustries, setLoadingIndustries] = useState(false);
  const [loadingSpecs, setLoadingSpecs] = useState(false);

  // 3.2 Fetch existing industries on mount
  useEffect(() => {
    (async () => {
      try {
        setLoadingIndustries(true);
        const res = await axios.get('/api/community/industries');
        setIndustryOptions(res.data);
      } catch (error) {
        console.error('Failed to fetch industries', error);
      } finally {
        setLoadingIndustries(false);
      }
    })();
  }, []);

  // 3.3 Fetch specializations whenever an industry is selected
  useEffect(() => {
    (async () => {
      if (!selectedIndustry) {
        setSpecOptions([]);
        return;
      }
      try {
        setLoadingSpecs(true);
        const res = await axios.get('/api/community/specializations', {
          params: { industryId: selectedIndustry._id },
        });
        setSpecOptions(res.data);
      } catch (error) {
        console.error('Failed to fetch specializations', error);
      } finally {
        setLoadingSpecs(false);
      }
    })();
  }, [selectedIndustry]);

  // 3.4 Form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Decide if user selected an existing or typed new
      const industryId = selectedIndustry?._id || null;
      const industryName = !industryId && industryInput ? industryInput : null;

      const specializationId = selectedSpec?._id || null;
      const specializationName =
        !specializationId && specInput ? specInput : null;

      // Prepare submission
      const submissionData = {
        fullName: data.fullName,
        yearOfBirth: data.yearOfBirth || undefined, // optional
        businessName: data.businessName || '',
        industryId,
        industryName,
        specializationId,
        specializationName,
        jobTitle: data.jobTitle || '',
        organization: data.organization || '',
        email: data.email,
        phoneNumber: data.phoneNumber || '',
        linkedIn: data.linkedIn || '',
        personalWebsite: data.personalWebsite || '',
        shortBio: data.shortBio,
        subscribeNewsletter: data.subscribeNewsletter || false,
        consentShare: data.consentShare || false,
        consentDisplay: data.consentDisplay || false,
      };

      await axios.post('/api/community/submit', submissionData);

      // On success
      onSuccess();
    } catch (error: any) {
      console.error('Submission Error:', error);
      alert(
        error.response?.data?.message ||
          'An error occurred while submitting the form. Please try again later.',
      );
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto bg-white p-8 rounded shadow"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Submit Your Information
      </h2>

      {/* Year of Birth (Optional) */}
      <div className="mb-4">
        <label htmlFor="yearOfBirth" className="block font-medium mb-1">
          Year of Birth (optional)
        </label>
        <input
          id="yearOfBirth"
          type="number"
          {...register('yearOfBirth')}
          className={`border w-full px-3 py-2 rounded ${
            errors.yearOfBirth ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.yearOfBirth && (
          <p className="text-red-500 text-sm mt-1">
            {errors.yearOfBirth.message}
          </p>
        )}
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label htmlFor="fullName" className="block font-medium mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          {...register('fullName')}
          className={`border w-full px-3 py-2 rounded ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Business Name */}
      <div className="mb-4">
        <label htmlFor="businessName" className="block font-medium mb-1">
          Business Name
        </label>
        <input
          id="businessName"
          type="text"
          {...register('businessName')}
          className={`border w-full px-3 py-2 rounded ${
            errors.businessName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.businessName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.businessName.message}
          </p>
        )}
      </div>

      {/* Industry (Smart Dropdown) */}
      <div className="mb-4">
        <label className="block font-medium mb-1">
          Industry <span className="text-red-500">*</span>
        </label>
        <Autocomplete
          options={industryOptions}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.name
          }
          value={selectedIndustry}
          onChange={(_, newValue) =>
            setSelectedIndustry(newValue as IndustryType | null)
          }
          inputValue={industryInput}
          onInputChange={(_, newInputValue) => setIndustryInput(newInputValue)}
          loading={loadingIndustries}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select or type a new industry"
              error={!!errors.industry}
              helperText={errors.industry?.message}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingIndustries ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          freeSolo
        />
      </div>

      {/* Specialization (Smart Dropdown) */}
      <div className="mb-4">
        <label className="block font-medium mb-1">
          Specialization <span className="text-red-500">*</span>
        </label>
        <Autocomplete
          options={specOptions}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.name
          }
          value={selectedSpec}
          onChange={(_, newValue) =>
            setSelectedSpec(newValue as SpecializationType | null)
          }
          inputValue={specInput}
          onInputChange={(_, newInputValue) => setSpecInput(newInputValue)}
          loading={loadingSpecs}
          disabled={!selectedIndustry && !industryInput}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select or type a new specialization"
              error={!!errors.specialization}
              helperText={errors.specialization?.message}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingSpecs ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          freeSolo
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`border w-full px-3 py-2 rounded ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Short Bio */}
      <div className="mb-4">
        <label htmlFor="shortBio" className="block font-medium mb-1">
          Short Bio <span className="text-red-500">*</span>
        </label>
        <textarea
          id="shortBio"
          rows={3}
          {...register('shortBio')}
          className={`border w-full px-3 py-2 rounded ${
            errors.shortBio ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.shortBio && (
          <p className="text-red-500 text-sm mt-1">{errors.shortBio.message}</p>
        )}
      </div>

      {/* Phone, LinkedIn, Personal Website, etc. */}
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block font-medium mb-1">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="text"
          {...register('phoneNumber')}
          className={`border w-full px-3 py-2 rounded ${
            errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="linkedIn" className="block font-medium mb-1">
          LinkedIn
        </label>
        <input
          id="linkedIn"
          type="text"
          {...register('linkedIn')}
          className={`border w-full px-3 py-2 rounded ${
            errors.linkedIn ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="personalWebsite" className="block font-medium mb-1">
          Personal Website
        </label>
        <input
          id="personalWebsite"
          type="text"
          {...register('personalWebsite')}
          className={`border w-full px-3 py-2 rounded ${
            errors.personalWebsite ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>

      {/* Consent & Newsletter */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register('consentShare')}
            className="mr-2"
          />
          <span>Consent to share information?</span>
        </label>
        {errors.consentShare && (
          <p className="text-red-500 text-sm mt-1">
            {errors.consentShare.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register('consentDisplay')}
            className="mr-2"
          />
          <span>Consent to display information?</span>
        </label>
        {errors.consentDisplay && (
          <p className="text-red-500 text-sm mt-1">
            {errors.consentDisplay.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register('subscribeNewsletter')}
            className="mr-2"
          />
          <span>Subscribe to Newsletter</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'
          } text-white px-6 py-2 rounded font-semibold transition-transform transform hover:scale-105`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </motion.form>
  );
}
