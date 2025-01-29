// app/page.tsx

import React from 'react';

import HomeHeroSection from '@/components/Home/HomeHeroSection';
import PastorsMessageSection from '@/components/Home/PastorsMessageSection';
import MissionValuesSection from '@/components/Home/MissionValuesSection';
import MassScheduleSection from '@/components/Home/MassScheduleSection';
import DiscoverCommunitySection from '@/components/Home/DiscoverCommunitySection';
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

      {/* 5. The new community discover section */}
      <DiscoverCommunitySection />

      {/* 6. Announcements & Upcoming Events */}
      <AnnouncementsSection />

      {/* 7. Featured Ministries & Programs */}
      <FeaturedMinistriesSection />

      {/* 8. Support & Giving */}
      <SupportGivingSection />

      {/* 9. Location & Contact */}
      <LocationContactSection />

      {/* 10. Newsletter Subscription */}
      <NewsletterSection />
    </>
  );
}
