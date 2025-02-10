'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submissionSchema } from '@/utils/validation';
import { z } from 'zod';
import { motion } from 'framer-motion';
import axios from 'axios';

// Material UI
import { Autocomplete, TextField, CircularProgress } from '@mui/material';

// Define form input types based on Zod schema
type FormData = z.infer<typeof submissionSchema>;

interface SubmissionFormProps {
  onSuccess: () => void;
}

interface IndustryType {
  _id: string;
  name: string;
}

interface SpecializationType {
  _id: string;
  name: string;
  industry?: string;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(submissionSchema),
  });

  // EXAMPLE: Additional fields that might be in your Zod schema
  // yearOfBirth, businessName, etc. We'll see how to handle them.

  // 1) State for industries / specializations
  const [industryOptions, setIndustryOptions] = useState<IndustryType[]>([]);
  const [specOptions, setSpecOptions] = useState<SpecializationType[]>([]);

  // 2) Selected industry and specialization from Autocomplete
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | null>(
    null,
  );
  const [industryInput, setIndustryInput] = useState(''); // free-form text

  const [selectedSpec, setSelectedSpec] = useState<SpecializationType | null>(
    null,
  );
  const [specInput, setSpecInput] = useState('');

  const [loadingIndustries, setLoadingIndustries] = useState(false);
  const [loadingSpecs, setLoadingSpecs] = useState(false);

  // On load, fetch industries
  useEffect(() => {
    async function fetchIndustries() {
      try {
        setLoadingIndustries(true);
        const res = await axios.get('/api/community/industries');
        setIndustryOptions(res.data); // array of { _id, name }
      } catch (error) {
        console.error('Failed to fetch industries', error);
      } finally {
        setLoadingIndustries(false);
      }
    }
    fetchIndustries();
  }, []);

  // Whenever selectedIndustry changes, fetch specializations
  useEffect(() => {
    async function fetchSpecializations() {
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
    }
    fetchSpecializations();
  }, [selectedIndustry]);

  // 3) Submission Handler
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // If the user selected an existing industry, we have an ID
      // If the user typed a new industry, we have industryInput
      const industryId = selectedIndustry?._id || null;
      const industryName = !industryId && industryInput ? industryInput : null;

      const specializationId = selectedSpec?._id || null;
      const specializationName =
        !specializationId && specInput ? specInput : null;

      // Prepare submission data
      const submissionData = {
        fullName: data.fullName,
        yearOfBirth: data.yearOfBirth,
        businessName: data.businessName,
        industryId,
        industryName,
        specializationId,
        specializationName,
        jobTitle: data.jobTitle,
        organization: data.organization,
        email: data.email,
        phoneNumber: data.phoneNumber,
        linkedIn: data.linkedIn,
        personalWebsite: data.personalWebsite,
        shortBio: data.shortBio,
        subscribeNewsletter: data.subscribeNewsletter || false,
        consentShare: data.consentShare,
        consentDisplay: data.consentDisplay,
      };

      // POST to our request submission API
      await axios.post('/api/community/submit', submissionData);

      // Trigger success callback
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
      encType="multipart/form-data"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Submit Your Information
      </h2>

      {/* Full Name */}
      <div className="mb-4">
        <label htmlFor="fullName" className="block font-medium mb-1">
          Full Name<span className="text-red-500">*</span>
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

      {/* Year of Birth */}
      <div className="mb-4">
        <label htmlFor="yearOfBirth" className="block font-medium mb-1">
          Year of Birth
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

      {/* Industry (smart dropdown) */}
      <div className="mb-4">
        <label className="block font-medium mb-1">
          Industry<span className="text-red-500">*</span>
        </label>
        <Autocomplete
          options={industryOptions}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.name
          }
          value={selectedIndustry}
          onChange={(_, newValue) => {
            if (typeof newValue === 'string') {
              setSelectedIndustry(null);
              setIndustryInput(newValue);
            } else {
              setSelectedIndustry(newValue);
              setIndustryInput(newValue?.name || '');
            }
          }}
          inputValue={industryInput}
          onInputChange={(_, newInputValue) => {
            setIndustryInput(newInputValue);
          }}
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
        {errors.industry && (
          <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>
        )}
      </div>

      {/* Specialization (smart dropdown) */}
      <div className="mb-4">
        <label className="block font-medium mb-1">
          Specialization<span className="text-red-500">*</span>
        </label>
        <Autocomplete
          options={specOptions}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.name
          }
          value={selectedSpec}
          onChange={(_, newValue) => {
            if (typeof newValue === 'string') {
              setSelectedSpec(null);
              setSpecInput(newValue);
            } else {
              setSelectedSpec(newValue);
              setSpecInput(newValue?.name || '');
            }
          }}
          inputValue={specInput}
          onInputChange={(_, newInputValue) => {
            setSpecInput(newInputValue);
          }}
          loading={loadingSpecs}
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
          disabled={!selectedIndustry && !industryInput}
        />
        {errors.specialization && (
          <p className="text-red-500 text-sm mt-1">
            {errors.specialization.message}
          </p>
        )}
      </div>

      {/* jobTitle, organization, email, phoneNumber, etc. omitted for brevity */}
      {/* Example for email: */}
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-1">
          Email<span className="text-red-500">*</span>
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

      {/* shortBio, phoneNumber, linkedIn, personalWebsite, etc. */}
      {/* ... */}

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
          } text-white px-6 py-2 rounded font-semibold`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Your Information'}
        </button>
      </div>
    </motion.form>
  );
};

export default SubmissionForm;
