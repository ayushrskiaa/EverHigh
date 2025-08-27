import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Get in touch with us and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-black mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 px-6 font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* General Contact */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-black mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail size={24} className="text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-black mb-1">Email</h3>
                    <a 
                      href="mailto:support@everhigh.com"
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      support@everhigh.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone size={24} className="text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-black mb-1">Phone</h3>
                    <a 
                      href="tel:+919599191998"
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      +91 9599191998
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock size={24} className="text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-black mb-1">Customer Service Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Address */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-black mb-6">Office Address</h2>
              <div className="flex items-start space-x-4">
                <MapPin size={24} className="text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    EVER HIGH Retail Private Limited<br />
                    M-81, Ground floor, M block market<br />
                    Greater Kailash II, Delhi 110048<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-black mb-6">Quick Help</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-black mb-2">Frequently Asked Questions</h3>
                  <p className="text-gray-600 mb-4">
                    Find answers to common questions about our products, shipping, and returns.
                  </p>
                  <button className="text-black hover:underline font-medium">
                    View FAQ →
                  </button>
                </div>
                
                <div>
                  <h3 className="font-semibold text-black mb-2">Shipping & Returns</h3>
                  <p className="text-gray-600 mb-4">
                    Learn about our shipping policies and return procedures.
                  </p>
                  <button className="text-black hover:underline font-medium">
                    Shipping Info →
                  </button>
                </div>
                
                <div>
                  <h3 className="font-semibold text-black mb-2">Size Guide</h3>
                  <p className="text-gray-600 mb-4">
                    Not sure about your size? Check our comprehensive size guide.
                  </p>
                  <button className="text-black hover:underline font-medium">
                    Size Guide →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-6">Follow Us</h2>
          <p className="text-gray-600 mb-8">
            Stay updated with our latest collections, behind-the-scenes content, and exclusive offers.
          </p>
          <div className="flex justify-center space-x-6">
            <button 
              onClick={() => window.open('https://instagram.com', '_blank')}
              className="text-gray-600 hover:text-black transition-colors"
            >
              Instagram
            </button>
            <button 
              onClick={() => window.open('https://youtube.com', '_blank')}
              className="text-gray-600 hover:text-black transition-colors"
            >
              YouTube
            </button>
            <button 
              onClick={() => window.open('https://linkedin.com', '_blank')}
              className="text-gray-600 hover:text-black transition-colors"
            >
              LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 