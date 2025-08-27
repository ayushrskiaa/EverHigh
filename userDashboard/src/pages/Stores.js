import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import { stores } from '../data/stores';

const Stores = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Our Stores</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Visit our physical stores to experience our premium streetwear collection in person. 
            Our expert staff is ready to help you find the perfect style.
          </p>
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store) => (
            <div key={store.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-4">{store.name}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin size={20} className="text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 leading-relaxed">{store.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-gray-600 flex-shrink-0" />
                    <a 
                      href={`tel:${store.phone}`}
                      className="text-gray-700 hover:text-black transition-colors"
                    >
                      {store.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock size={20} className="text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">Monday - Saturday: 11:00 AM - 9:00 PM</p>
                      <p className="text-gray-700">Sunday: 12:00 PM - 8:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="w-full bg-black text-white py-3 px-4 font-semibold hover:bg-gray-800 transition-colors rounded-md">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Store Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-black mb-6 text-center">Find Us on the Map</h2>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Interactive map will be integrated here</p>
            </div>
          </div>
        </div>

        {/* Store Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">Multiple Locations</h3>
            <p className="text-gray-600">
              Visit us at any of our 5 stores across major cities in India
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={24} />
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">Extended Hours</h3>
            <p className="text-gray-600">
              Open 7 days a week with extended shopping hours for your convenience
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={24} />
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">Expert Assistance</h3>
            <p className="text-gray-600">
              Our knowledgeable staff is here to help you find the perfect fit and style
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our customer service team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <Phone size={20} className="text-gray-600" />
                <span className="text-gray-700">+91 9599191998</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={20} className="text-gray-600" />
                <span className="text-gray-700">support@everhigh.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stores; 