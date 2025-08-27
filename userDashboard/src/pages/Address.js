import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { address } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header/Logo */}
      <div className="w-full bg-gradient-to-r from-orange-400 to-pink-500 py-4 px-6 flex items-center justify-between shadow">
        <div className="text-2xl font-bold text-white tracking-widest">EVER HIGH</div>
        <div className="text-sm text-white font-semibold">NEW DROP LIVE • FREE SHIPPING WORLDWIDE</div>
      </div>
      {/* Main Checkout Layout */}
      <div className="flex-1 flex flex-col md:flex-row justify-center items-start bg-gray-50 py-10">
        {/* Address Form */}
        <div className="w-full md:w-2/3 max-w-lg bg-white rounded-xl shadow-lg p-8 mx-auto md:mx-0 md:mr-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Shipping Address</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" value={address.name} onChange={handleChange} required placeholder="Full Name" className="w-full border px-4 py-3 rounded focus:ring-2 focus:ring-orange-400" />
            <input name="phone" value={address.phone} onChange={handleChange} required placeholder="Phone Number" className="w-full border px-4 py-3 rounded focus:ring-2 focus:ring-orange-400" />
            <input name="street" value={address.street} onChange={handleChange} required placeholder="Street Address" className="w-full border px-4 py-3 rounded focus:ring-2 focus:ring-orange-400" />
            <div className="flex gap-4">
              <input name="city" value={address.city} onChange={handleChange} required placeholder="City" className="w-1/2 border px-4 py-3 rounded focus:ring-2 focus:ring-orange-400" />
              <input name="state" value={address.state} onChange={handleChange} required placeholder="State" className="w-1/2 border px-4 py-3 rounded focus:ring-2 focus:ring-orange-400" />
            </div>
            <div className="flex gap-4">
              <input name="zip" value={address.zip} onChange={handleChange} required placeholder="ZIP Code" className="w-1/2 border px-4 py-3 rounded focus:ring-2 focus:ring-orange-400" />
              <input name="country" value={address.country} onChange={handleChange} required placeholder="Country" className="w-1/2 border px-4 py-3 rounded focus:ring-2 focus:ring-orange-400" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded font-semibold hover:from-orange-600 hover:to-pink-600 transition-colors text-lg mt-4">Continue to Payment</button>
          </form>
        </div>
        {/* Order Summary */}
        <div className="w-full md:w-1/3 max-w-sm bg-white rounded-xl shadow-lg p-8 mt-10 md:mt-0 mx-auto md:mx-0">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Order Summary</h3>
          {/* Demo summary, replace with real cart data if needed */}
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Subtotal</span>
            <span>RS. 4,495</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Tax</span>
            <span>Included</span>
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="flex justify-between text-lg font-bold text-black">
            <span>Total</span>
            <span>RS. 4,495</span>
          </div>
          <div className="mt-6 text-xs text-gray-500 text-center">Tax included. Shipping and discounts calculated at payment.</div>
        </div>
      </div>
    </div>
  );
};

export default Address; 