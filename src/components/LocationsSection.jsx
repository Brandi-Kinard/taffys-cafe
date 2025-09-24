import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">About</h2>
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              Taffy's began with a simple philosophy: exceptional food should be an experience. 
              What started as a passion for creating perfect charcuterie boards has evolved into 
              a full cafe celebrating artisanal craftsmanship.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Every morning, our team handpicks the finest cheeses, cures, and chocolates. 
              Our pastries are baked fresh daily, and every board tells its own story.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-6">Visit Us</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900">NoDa District</p>
                <p className="text-gray-700 mt-1">123 North Davidson Street<br/>Charlotte, NC 28206</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Hours</p>
                <p className="text-gray-700 mt-1">Mon-Fri: 7AM - 4PM<br/>Sat-Sun: 6AM - 10PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};