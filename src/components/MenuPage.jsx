import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Minus, ShoppingBag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const menuCategories = [
  'Charcuterie Boards',
  'Finger Sandwiches', 
  'Caffeinated Beverages',
  'Non-Caffeinated Beverages',
  'Sweets & Pastries',
  'Soups',
  'Savories'
];

const menuItems = [
  {
    id: '1',
    name: 'Classic Artisan Board',
    description: 'Our signature board featuring aged gouda, prosciutto, fresh grapes, and artisanal crackers',
    price: 24.99,
    image: '/taffys-cafe/edibles/board.png',
    category: 'Charcuterie Boards',
    ingredients: ['Aged Gouda', 'Prosciutto', 'Fresh Grapes', 'Artisanal Crackers', 'Fig Jam'],
  },
  {
    id: '2',
    name: 'Sweet Dreams Board',
    description: 'A dessert lovers paradise with chocolate-covered strawberries, macarons, and artisan chocolates',
    price: 32.99,
    image: '/taffys-cafe/edibles/spread-2.png',
    category: 'Charcuterie Boards',
    ingredients: ['Chocolate Strawberries', 'French Macarons', 'Artisan Chocolates', 'Fresh Berries'],
  },
  {
    id: '3',
    name: 'Cucumber Tea Sandwich',
    description: 'Delicate cucumber slices with herbed cream cheese on crustless bread',
    price: 8.99,
    image: '/taffys-cafe/edibles/bread-1.png',
    category: 'Finger Sandwiches',
    ingredients: ['Fresh Cucumber', 'Herbed Cream Cheese', 'Artisan White Bread'],
  },
  {
    id: '4',
    name: 'Lavender Honey Latte',
    description: 'Our house espresso with lavender-infused honey and steamed milk',
    price: 5.75,
    image: '/taffys-cafe/edibles/tea-cup.png',
    category: 'Caffeinated Beverages',
  },
  {
    id: '5',
    name: 'Rose Petal Smoothie',
    description: 'A refreshing blend of strawberries, rose water, and coconut milk',
    price: 7.25,
    image: '/taffys-cafe/edibles/spread-1.png',
    category: 'Non-Caffeinated Beverages',
  },
  {
    id: '6',
    name: 'French Macarons (Box of 6)',
    description: 'Assorted flavors of our signature macarons made fresh daily',
    price: 18.99,
    image: '/taffys-cafe/edibles/cheese-4.png',
    category: 'Sweets & Pastries',
  },
];

export const MenuPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Charcuterie Boards');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item) => {
    setCart(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartItemQuantity = (itemId, change) => {
    setCart(prev => 
      prev.map(item => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-rose-600 hover:text-rose-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <h1 className="text-3xl sacramento text-rose-700">
              Our Menu
            </h1>
          </div>
          
          <button 
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 px-4 py-2 border border-rose-300 rounded-full text-rose-600 hover:bg-rose-50"
          >
            <ShoppingBag className="w-4 h-4" />
            Cart
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="font-medium mb-4 text-rose-700">Categories</h3>
              <div className="space-y-2">
                {menuCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category 
                        ? 'bg-rose-100 text-rose-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:w-3/4">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-4xl mb-8 sacramento text-rose-700">
                {selectedCategory}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-contain p-4 bg-rose-50"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-lg">{item.name}</h3>
                        <span className="text-lg font-medium text-rose-600">
                          ${item.price}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">
                        {item.description}
                      </p>
                      
                      {item.ingredients && (
                        <div className="mb-4 flex flex-wrap gap-1">
                          {item.ingredients.slice(0, 3).map((ingredient) => (
                            <span key={ingredient} className="text-xs px-2 py-1 bg-rose-100 text-rose-700 rounded-full">
                              {ingredient}
                            </span>
                          ))}
                          {item.ingredients.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-rose-100 text-rose-700 rounded-full">
                              +{item.ingredients.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      <button 
                        className="w-full flex items-center justify-center gap-2 bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowCart(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Your Order</h3>
                  <button onClick={() => setShowCart(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <span className="text-sm font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateCartItemQuantity(item.id, -1)}
                              className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartItemQuantity(item.id, 1)}
                              className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm text-gray-500">${item.price.toFixed(2)} each</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="p-6 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="text-xl font-medium text-rose-600">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};