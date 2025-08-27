import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="text-3xl font-black text-gradient-primary">
                EVER HIGH
              </div>
              <div className="ml-2 w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Premium streetwear clothing brand in India. Shaping the future of Indian streetwear with a unique blend of comfort and trendsetting designs.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => window.open('https://instagram.com', '_blank')}
                className="text-gray-400 hover:text-pink-500 transition-colors duration-300 transform hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </button>
              <button 
                onClick={() => window.open('https://youtube.com', '_blank')}
                className="text-gray-400 hover:text-red-500 transition-colors duration-300 transform hover:scale-110"
                aria-label="Follow us on YouTube"
              >
                <Youtube size={20} />
              </button>
              <button 
                onClick={() => window.open('https://linkedin.com', '_blank')}
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={20} />
              </button>
              <button 
                onClick={() => window.open('https://twitter.com', '_blank')}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={20} />
              </button>
              <button 
                onClick={() => window.open('https://facebook.com', '_blank')}
                className="text-gray-400 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </button>
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gradient-primary">HELP</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <button className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-left">
                  FAQ
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-left">
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-left">
                  Size Guide
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-left">
                  Track Order
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gradient-secondary">COMPANY</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/stores" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                  Our Stores
                </Link>
              </li>
              <li>
                <button className="text-gray-400 hover:text-blue-500 transition-colors duration-300 text-left">
                  Careers
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-blue-500 transition-colors duration-300 text-left">
                  Press
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-blue-500 transition-colors duration-300 text-left">
                  Sustainability
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gradient-accent">LEGAL</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-400 hover:text-green-500 transition-colors duration-300 text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-green-500 transition-colors duration-300 text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-green-500 transition-colors duration-300 text-left">
                  Cookie Policy
                </button>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-400 hover:text-green-500 transition-colors duration-300">
                  Return & Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 EVER HIGH RETAIL PRIVATE LIMITED, ALL RIGHTS RESERVED.
            </div>
            <div className="flex space-x-6 text-sm">
              <span className="text-gray-400 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent font-semibold">Made in India</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">Shipping Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 