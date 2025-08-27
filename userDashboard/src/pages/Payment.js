import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [payment, setPayment] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [processing, setProcessing] = useState(false);
  const [method, setMethod] = useState('card'); // 'card' or 'cod'

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (method === 'cod') {
      // Go to order confirmation with COD
      navigate('/order-confirmation', {
        state: {
          address: location.state?.address,
          payment: { method: 'Cash on Delivery' },
          cart: JSON.parse(localStorage.getItem('cart') || '[]'),
        },
      });
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      // Redirect to external payment gateway (simulate)
      window.location.href = 'https://www.example-payment-gateway.com/checkout';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
        <div className="mb-6 flex space-x-4">
          <button
            type="button"
            className={`px-4 py-2 rounded font-semibold border transition-colors ${method === 'card' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
            onClick={() => setMethod('card')}
          >
            Card Payment
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded font-semibold border transition-colors ${method === 'cod' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
            onClick={() => setMethod('cod')}
          >
            Cash on Delivery
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {method === 'card' && (
            <>
              <input name="cardName" value={payment.cardName} onChange={handleChange} required placeholder="Name on Card" className="w-full border px-4 py-2 rounded" />
              <input name="cardNumber" value={payment.cardNumber} onChange={handleChange} required placeholder="Card Number" className="w-full border px-4 py-2 rounded" maxLength={16} />
              <div className="flex space-x-2">
                <input name="expiry" value={payment.expiry} onChange={handleChange} required placeholder="MM/YY" className="w-1/2 border px-4 py-2 rounded" maxLength={5} />
                <input name="cvv" value={payment.cvv} onChange={handleChange} required placeholder="CVV" className="w-1/2 border px-4 py-2 rounded" maxLength={4} />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition-colors"
            disabled={processing}
          >
            {processing
              ? 'Processing...'
              : method === 'card'
                ? 'Pay Now'
                : 'Place Order (COD)'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment; 