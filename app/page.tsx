// app/page.tsx

import React from 'react';

import HomeHeroSection from '@/components/Home/HomeHeroSection';
import DiscoverCommunitySection from '@/components/Home/DiscoverCommunitySection';
import NewsletterSection from '@/components/Home/NewsletterSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <article className="flex-grow">
      <Header />
      <section className="min-h-screen flex flex-col bg-gray-50">
        {/* 1. Hero Section */}
        <HomeHeroSection />
        {/* 5. The new community discover section */}
        <DiscoverCommunitySection />

        {/* 10. Newsletter Subscription */}
        <NewsletterSection />
      </section>
      <Footer />
    </article>
  );
}
