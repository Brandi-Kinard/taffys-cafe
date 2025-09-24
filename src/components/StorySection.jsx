import React from 'react';
import { motion } from 'framer-motion';

export const MenuSection = () => {
  const menuCategories = [
    {
      title: "Charcuterie Boards",
      description: "Artfully curated selections",
      items: [
        { name: "The Classic", price: "$24", description: "Aged cheeses, cured meats, seasonal fruits" },
        { name: "Morning Board", price: "$28", description: "Pastries, spreads, artisanal breads" },
        { name: "Sweet Indulgence", price: "$26", description: "Chocolates, desserts, fresh berries" }
      ]
    },
    {
      title: "Fresh Pastries",
      description: "Baked daily with love",
      items: [
        { name: "Croissants", price: "$4", description: "Buttery, flaky, perfect with coffee" },
        { name: "Artisan Muffins", price: "$5", description: "Seasonal flavors, locally sourced" },
        { name: "Danish Selection", price: "$6", description: "Cream cheese, fruit, or chocolate" }
      ]
    },
    {
      title: "Artisanal Chocolates",
      description: "Handcrafted confections",
      items: [
        { name: "Truffle Box (6)", price: "$18", description: "House-made, rotating flavors" },
        { name: "Hot Chocolate", price: "$7", description: "Rich, European-style drinking chocolate" },
        { name: "Chocolate Board", price: "$22", description: "Curated selection with pairings" }
      ]
    }
  ];

  return (
    <section id="menu" className="py-24 bg-gradient-to-br from-slate-50 to-stone-100" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-medium rounded-full mb-6">
            🍯 Curated Daily
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Artisanal Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every item handcrafted with premium ingredients sourced from local artisans and global purveyors
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {menuCategories.map((category, index) => (
            <div key={category.title} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                {/* Category Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">
                      {index === 0 ? '🧀' : index === 1 ? '🥐' : '🍫'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 italic">{category.description}</p>
                </div>
                
                {/* Menu Items */}
                <div className="space-y-6">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900 text-lg">{item.name}</h4>
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-semibold text-sm ml-4">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Experience Perfection?</h3>
            <p className="mb-6 text-amber-100">Order online for pickup or let us cater your next event</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors">
                Order Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
                View Catering Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};