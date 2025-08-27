import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { address, payment, cart } = location.state || {};
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Simulate sending email
    setTimeout(() => setEmailSent(true), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Order Confirmed!</h2>
        {emailSent && <div className="mb-4 text-green-700">A confirmation email has been sent to your email address.</div>}
        <p className="mb-6">Thank you for your purchase. Your order has been placed successfully.</p>
        <h3 className="font-semibold mb-2">Shipping Address</h3>
        <div className="mb-4 text-sm text-gray-700">
          {address ? (
            <div>
              <div>{address.name}</div>
              <div>{address.phone}</div>
              <div>{address.street}, {address.city}, {address.state}, {address.zip}, {address.country}</div>
            </div>
          ) : 'N/A'}
        </div>
        <h3 className="font-semibold mb-2">Payment Details</h3>
        <div className="mb-4 text-sm text-gray-700">
          {payment ? (
            payment.method === 'Cash on Delivery' ? (
              <div>Payment Method: <span className="font-semibold">COD</span></div>
            ) : (
              <>
                <div>Name on Card: {payment.cardName || '-'}</div>
                <div>Card Number: **** **** **** {payment.cardNumber ? payment.cardNumber.slice(-4) : '----'}</div>
              </>
            )
          ) : 'N/A'}
        </div>
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <div className="mb-4 text-sm text-gray-700">
          {cart && cart.length > 0 ? (
            <ul>
              {cart.map((item, idx) => (
                <li key={idx}>{item.product.name} x {item.quantity || 1}</li>
              ))}
            </ul>
          ) : 'N/A'}
        </div>
        <Link to="/shop" className="inline-block mt-6 bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition-colors">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation; 