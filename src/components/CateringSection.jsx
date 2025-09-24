import React from 'react';
import { motion } from 'framer-motion';

export const CateringSection = () => {
  return (
    <section id="catering" className="py-24 bg-gradient-to-b from-cream to-rose-50">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-6xl mb-6 sacramento text-rose-700">
            Catering & Events
          </h2>
          
          <p className="text-lg text-gray-700 mb-12">
            Let us bring the magic of Taffy's to your special occasion. From intimate gatherings to grand celebrations, 
            we create custom charcuterie experiences that leave lasting impressions.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl sacramento text-rose-600 mb-4">Weddings</h3>
              <p className="text-gray-600 text-sm">
                Elegant boards and displays for your perfect day
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl sacramento text-rose-600 mb-4">Corporate</h3>
              <p className="text-gray-600 text-sm">
                Impress clients and colleagues with artisanal spreads
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl sacramento text-rose-600 mb-4">Private Parties</h3>
              <p className="text-gray-600 text-sm">
                Customized boards for birthdays, showers, and more
              </p>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
          >
            Request Catering Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};