/* eslint-disable @typescript-eslint/no-explicit-any */
// components/RequestMembership/SubmissionForm.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submissionSchema } from '@/utils/validation';
import { z } from 'zod';
import { industries, industrySpecializations } from '@/data/industries';
import { motion } from 'framer-motion';
import axios from 'axios';

// Define form input types based on Zod schema
type FormData = z.infer<typeof submissionSchema>;

interface SubmissionFormProps {
  onSuccess: () => void;
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

  const selectedIndustry = watch('industry');
  const [specializations, setSpecializations] = useState<string[]>([]);

  useEffect(() => {
    if (selectedIndustry && industrySpecializations[selectedIndustry]) {
      setSpecializations(industrySpecializations[selectedIndustry]);
    } else {
      setSpecializations([]);
    }
  }, [selectedIndustry]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Handle file upload if photo is provided
      let photoUrl = '';
      if (data.photo && data.photo.length > 0) {
        const formData = new FormData();
        formData.append('file', data.photo[0]);

        const uploadResponse = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        photoUrl = uploadResponse.data.url; // Assuming the API returns the uploaded file URL
      }

      // Prepare submission data
      const submissionData = {
        fullName: data.fullName,
        preferredName: data.preferredName,
        photoUrl: photoUrl || '',
        industry: data.industry,
        specialization: data.specialization,
        jobTitle: data.jobTitle,
        organization: data.organization,
        email: data.email,
        phoneNumber: data.phoneNumber,
        linkedIn: data.linkedIn,
        personalWebsite: data.personalWebsite,
        shortBio: data.shortBio,
        areasOfExpertise: data.areasOfExpertise || [],
        interests: data.interests,
        profileVisibility: data.profileVisibility,
        consent: data.consent,
        subscribeNewsletter: data.subscribeNewsletter || false,
      };

      // Submit the data to the API
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
      aria-labelledby="submission-form-heading"
      encType="multipart/form-data"
    >
      <h2
        id="submission-form-heading"
        className="text-2xl md:text-3xl font-bold mb-6 text-center"
      >
        Submit Your Information
      </h2>

      {/* Personal Information */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block mb-1 font-medium">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="e.g., Dr. John Doe"
              {...register('fullName')}
              className={`w-full border ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.fullName ? 'true' : 'false'}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Preferred Name/Nickname */}
          <div>
            <label htmlFor="preferredName" className="block mb-1 font-medium">
              Preferred Name/Nickname
            </label>
            <input
              id="preferredName"
              type="text"
              placeholder="e.g., Johnny"
              {...register('preferredName')}
              className={`w-full border ${
                errors.preferredName ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.preferredName ? 'true' : 'false'}
            />
            {errors.preferredName && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.preferredName.message}
              </p>
            )}
          </div>

          {/* Photo Upload */}
          <div className="md:col-span-2">
            <label htmlFor="photo" className="block mb-1 font-medium">
              Photo Upload
            </label>
            <input
              id="photo"
              type="file"
              accept=".jpg,.jpeg,.png"
              {...register('photo')}
              className={`w-full border ${
                errors.photo ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.photo ? 'true' : 'false'}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {typeof errors.photo.message === 'string' &&
                  errors.photo.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Professional Information */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Professional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Industry */}
          <div>
            <label htmlFor="industry" className="block mb-1 font-medium">
              Industry<span className="text-red-500">*</span>
            </label>
            <select
              id="industry"
              {...register('industry')}
              className={`w-full border ${
                errors.industry ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.industry ? 'true' : 'false'}
            >
              <option value="">Select Industry</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.industry.message}
              </p>
            )}
          </div>

          {/* Specialization */}
          <div>
            <label htmlFor="specialization" className="block mb-1 font-medium">
              Specialization<span className="text-red-500">*</span>
            </label>
            <select
              id="specialization"
              {...register('specialization')}
              className={`w-full border ${
                errors.specialization ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={!selectedIndustry}
              aria-invalid={errors.specialization ? 'true' : 'false'}
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            {errors.specialization && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.specialization.message}
              </p>
            )}
          </div>

          {/* Job Title */}
          <div>
            <label htmlFor="jobTitle" className="block mb-1 font-medium">
              Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              placeholder="e.g., Pediatrician"
              {...register('jobTitle')}
              className={`w-full border ${
                errors.jobTitle ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.jobTitle ? 'true' : 'false'}
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.jobTitle.message}
              </p>
            )}
          </div>

          {/* Organization/Company */}
          <div>
            <label htmlFor="organization" className="block mb-1 font-medium">
              Organization/Company
            </label>
            <input
              id="organization"
              type="text"
              placeholder="e.g., St. Mary’s Hospital"
              {...register('organization')}
              className={`w-full border ${
                errors.organization ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.organization ? 'true' : 'false'}
            />
            {errors.organization && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.organization.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g., johndoe@example.com"
              {...register('email')}
              className={`w-full border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block mb-1 font-medium">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              placeholder="e.g., +1234567890"
              {...register('phoneNumber')}
              className={`w-full border ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.phoneNumber ? 'true' : 'false'}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* LinkedIn Profile */}
          <div>
            <label htmlFor="linkedIn" className="block mb-1 font-medium">
              LinkedIn Profile
            </label>
            <input
              id="linkedIn"
              type="url"
              placeholder="e.g., https://www.linkedin.com/in/johndoe"
              {...register('linkedIn')}
              className={`w-full border ${
                errors.linkedIn ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.linkedIn ? 'true' : 'false'}
            />
            {errors.linkedIn && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.linkedIn.message}
              </p>
            )}
          </div>

          {/* Personal Website/Portfolio */}
          <div>
            <label htmlFor="personalWebsite" className="block mb-1 font-medium">
              Personal Website/Portfolio
            </label>
            <input
              id="personalWebsite"
              type="url"
              placeholder="e.g., https://www.johndoeportfolio.com"
              {...register('personalWebsite')}
              className={`w-full border ${
                errors.personalWebsite ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.personalWebsite ? 'true' : 'false'}
            />
            {errors.personalWebsite && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.personalWebsite.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Profile Details */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Profile Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Short Bio */}
          <div className="md:col-span-2">
            <label htmlFor="shortBio" className="block mb-1 font-medium">
              Short Bio<span className="text-red-500">*</span>
            </label>
            <textarea
              id="shortBio"
              placeholder='e.g., "I have been a proud member of St. John Maron for over 15 years..."'
              {...register('shortBio')}
              className={`w-full border ${
                errors.shortBio ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.shortBio ? 'true' : 'false'}
            ></textarea>
            {errors.shortBio && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.shortBio.message}
              </p>
            )}
          </div>

          {/* Areas of Expertise */}
          <div className="md:col-span-1">
            <label
              htmlFor="areasOfExpertise"
              className="block mb-1 font-medium"
            >
              Areas of Expertise
            </label>
            <Controller
              control={control}
              name="areasOfExpertise"
              render={({ field }) => (
                <select
                  id="areasOfExpertise"
                  multiple
                  {...field}
                  className={`w-full border ${
                    errors.areasOfExpertise
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-invalid={errors.areasOfExpertise ? 'true' : 'false'}
                >
                  <option value="Community Service">Community Service</option>
                  <option value="Youth Leadership">Youth Leadership</option>
                  <option value="Music">Music</option>
                  <option value="Education">Education</option>
                  <option value="Arts">Arts</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  {/* Add more options as needed */}
                </select>
              )}
            />
            {errors.areasOfExpertise && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.areasOfExpertise.message}
              </p>
            )}
          </div>

          {/* Interests & Hobbies */}
          <div className="md:col-span-1">
            <label htmlFor="interests" className="block mb-1 font-medium">
              Interests & Hobbies
            </label>
            <textarea
              id="interests"
              placeholder='e.g., "Reading, Hiking, Playing the Piano"'
              {...register('interests')}
              className={`w-full border ${
                errors.interests ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={errors.interests ? 'true' : 'false'}
            ></textarea>
            {errors.interests && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.interests.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Permissions & Privacy */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Permissions & Privacy</h3>
        <div className="flex flex-col gap-4">
          {/* Profile Visibility */}
          <div>
            <span className="block mb-1 font-medium">
              Profile Visibility<span className="text-red-500">*</span>
            </span>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Public"
                  {...register('profileVisibility')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">
                  Public (Visible to all website visitors)
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Private"
                  {...register('profileVisibility')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">
                  Private (Visible only to parish staff)
                </span>
              </label>
            </div>
            {errors.profileVisibility && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.profileVisibility.message}
              </p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('consent')}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2">
                I consent to having my information published on the St. John
                Maron Maronite Catholic Church website.
                <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.consent && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.consent.message}
              </p>
            )}
          </div>

          {/* Newsletter Subscription */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('subscribeNewsletter')}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2">
                Subscribe to the parish newsletter for updates and
                announcements.
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white px-6 py-2 rounded font-semibold transition-transform transform hover:scale-105`}
          aria-label="Submit Your Information"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Your Information'}
        </button>
      </div>
    </motion.form>
  );
};

export default SubmissionForm;
