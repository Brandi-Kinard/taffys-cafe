import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const ContactSection = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/menu');
  };

  return (
    <section id="contact" className="py-20 bg-white" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Order</h2>

        <div className="text-center">
          <div className="bg-orange-600 p-12 text-white rounded-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Order Online</h3>
            <p className="mb-10 text-lg leading-relaxed">Ready to enjoy our artisanal delights? Order for pickup or delivery.</p>
            
            <button
              onClick={handleOrderClick}
              className="bg-white text-orange-600 py-4 px-10 rounded-lg font-semibold hover:bg-gray-50 inline-block text-lg"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};