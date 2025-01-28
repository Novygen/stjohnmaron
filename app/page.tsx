// app/page.tsx

import React from 'react';

import HeroBanner from '@/components/HeroBanner';
import WelcomeSection from '@/components/Home/WelcomeSection';
import MissionSection from '@/components/Home/MissionSection';
import UpcomingEventsSection from '@/components/Home/UpcomingEventsSection';
import DonationsCallToAction from '@/components/Home/DonationsCallToAction';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <WelcomeSection />
      <MissionSection />
      <UpcomingEventsSection />
      <DonationsCallToAction />
    </>
  );
}
