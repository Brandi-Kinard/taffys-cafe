import React from 'react';
import { HeroSection } from './HeroSection';
import { MenuSection } from './StorySection';
import { AboutSection } from './LocationsSection';
import { ContactSection } from './OrderSection';

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MenuSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};