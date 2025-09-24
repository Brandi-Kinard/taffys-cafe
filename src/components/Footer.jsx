import React from 'react';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-rose-900 text-white py-12">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-3xl sacramento mb-4">Taffy's</h3>
            <p className="text-rose-200 text-sm">
              Where every bite tells a story
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-rose-200">
              <li><a href="#story" className="hover:text-white transition">Our Story</a></li>
              <li><a href="#locations" className="hover:text-white transition">Locations</a></li>
              <li><a href="#catering" className="hover:text-white transition">Catering</a></li>
              <li><a href="/menu" className="hover:text-white transition">Order Online</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <div className="space-y-2 text-rose-200">
              <p className="flex items-center gap-2">
                <Phone size={16} />
                (704) 555-0123
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} />
                hello@taffys.com
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-medium mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-rose-200 hover:text-white transition">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-rose-200 hover:text-white transition">
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-rose-800 mt-8 pt-8 text-center text-rose-200 text-sm">
          <p>&copy; 2024 Taffy's. Made with love and chocolate.</p>
        </div>
      </div>
    </footer>
  );
};