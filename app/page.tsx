// app/page.tsx
'use client'; // if using client-specific libraries or animations

import React from 'react';

import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <section>
      {/* Hero / Banner */}
      <div
        className="
          relative
          flex
          items-center
          justify-center
          h-[50vh]
          bg-cover bg-center
          text-[var(--color-header-text)]
          text-center
        "
        style={{
          backgroundImage: 'url("/images/church-hero.jpg")', // place an image in /public/images
          backgroundColor: 'var(--color-header-bg)', // fallback color
        }}
      >
        <div className="bg-black bg-opacity-40 absolute inset-0" />
        <h2 className="relative z-10 text-3xl md:text-5xl font-bold">
          Welcome to St John Maron Church
        </h2>
      </div>

      {/* Contact & Address */}
      <div
        id="contact"
        className="py-8 px-4 sm:px-8 md:px-16 text-center bg-[var(--color-background)]"
      >
        <h3 className="text-2xl font-semibold mb-2">
          45 Inwood Place, Rochester NY 14620
        </h3>
        <p className="text-lg">Phone: (585) 473-2362</p>
      </div>

      {/* Mass Times */}
      <div
        id="mass-times"
        className="py-10 px-4 sm:px-8 md:px-16 bg-[var(--color-accent)] text-[var(--color-header-text)]"
      >
        <h2 className="text-2xl font-bold mb-4">Mass Times</h2>
        <ul className="space-y-2 text-lg">
          <li>Saturday: 4:30 PM</li>
          <li>Sunday: 10:00 AM</li>
          <li>Weekdays (Mon-Fri): 9:00 AM</li>
          <li>Confessions: 30 minutes before Mass or by request</li>
        </ul>
      </div>

      {/* Announcements / Section */}
      <div className="py-10 px-4 sm:px-8 md:px-16">
        <h2 className="text-2xl font-bold mb-4">Announcements</h2>
        <div className="space-y-4">
          <p>
            <strong>Upcoming Events:</strong> Check our calendar for parish
            gatherings and community activities!
          </p>
          <p>
            <strong>Daily Readings:</strong> Scroll down for daily Mass readings
            or visit our{' '}
            <a href="#readings" className="underline">
              Readings Section
            </a>{' '}
            below.
          </p>
        </div>
      </div>

      {/* Example Motion Section (Framer Motion) */}
      <motion.div
        className="py-10 px-4 sm:px-8 md:px-16 bg-[var(--color-background)] text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} // animates on first scroll into view
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-2">Join Our Community</h2>
        <p>
          Whether you are visiting or looking for a parish to call home, we
          warmly welcome you to St John Maron.
        </p>
      </motion.div>

      {/* Map or Directions Section (placeholder) */}
      <div className="py-10 px-4 sm:px-8 md:px-16 text-center bg-[var(--color-accent)] text-[var(--color-header-text)]">
        <h2 className="text-2xl font-bold mb-4">Location</h2>
        <p className="mb-4">45 Inwood Place, Rochester NY 14620</p>
        <iframe
          title="St John Maron Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11656.785201419044!2d-77.585503!3d43.129512!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb91eb91b2d777da7!2sSt%20John%20Maron%20Maronite%20Catholic%20Church!5e0!3m2!1sen!2sus!4vXXXXX"
          width="100%"
          height="400"
          allowFullScreen
          loading="lazy"
          className="mx-auto border-0"
          style={{ maxWidth: '600px' }}
        />
      </div>

      {/* Additional sections or embed calendars, etc. */}
      {/* ... */}
    </section>
  );
}
