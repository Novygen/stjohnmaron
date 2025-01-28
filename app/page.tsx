// app/page.tsx

import React from 'react';

import HomeHeroSection from '@/components/Home/HomeHeroSection';
import PastorsMessageSection from '@/components/Home/PastorsMessageSection';
import MissionValuesSection from '@/components/Home/MissionValuesSection';
import MassScheduleSection from '@/components/Home/MassScheduleSection';
import AnnouncementsSection from '@/components/Home/AnnouncementsSection';
import FeaturedMinistriesSection from '@/components/Home/FeaturedMinistriesSection';
import SupportGivingSection from '@/components/Home/SupportGivingSection';
import LocationContactSection from '@/components/Home/LocationContactSection';
import NewsletterSection from '@/components/Home/NewsletterSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <HomeHeroSection />

      {/* 2. Pastor’s Welcome Message */}
      <PastorsMessageSection />

      {/* 3. Our Mission & Values */}
      <MissionValuesSection />

      {/* 4. Mass Schedule & Liturgies */}
      <MassScheduleSection />

      {/* 5. Announcements & Upcoming Events */}
      <AnnouncementsSection />

      {/* 6. Featured Ministries & Programs */}
      <FeaturedMinistriesSection />

      {/* 7. Support & Giving */}
      <SupportGivingSection />

      {/* 8. Location & Contact */}
      <LocationContactSection />

      {/* 9. Newsletter Subscription */}
      <NewsletterSection />
    </>
  );
}
