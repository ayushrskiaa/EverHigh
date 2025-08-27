import React from 'react';

const ReturnPolicy = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Return & Refund Policy</h2>
      <p className="mb-4">We want you to be fully satisfied with your purchase. If you are not happy with your order, you may return most new, unopened items within 7 days of delivery for a full refund.</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>Items must be returned in their original condition and packaging.</li>
        <li>Refunds will be processed to your original payment method within 5-7 business days after we receive your return.</li>
        <li>Shipping costs are non-refundable unless the return is due to our error.</li>
        <li>To start a return, please contact our support team with your order details.</li>
      </ul>
      <p>If you have any questions, please contact us at <a href="mailto:support@example.com" className="text-blue-600 underline">support@example.com</a>.</p>
    </div>
  </div>
);

export default ReturnPolicy; 