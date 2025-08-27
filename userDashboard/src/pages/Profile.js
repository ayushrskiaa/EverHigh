import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
  });
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Home', street: '123 Main St', city: 'City', state: 'State', zip: '12345', country: 'Country' },
  ]);
  const [orders] = useState([
    { id: 1, date: '2024-06-01', total: 4999, status: 'Delivered', tracking: 'TRK123456' },
    { id: 2, date: '2024-05-20', total: 2999, status: 'Shipped', tracking: 'TRK654321' },
    { id: 3, date: '2024-05-10', total: 1999, status: 'Processing', tracking: 'TRK111222' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Profile Info</h3>
          <div>Name: {profile.name}</div>
          <div>Email: {profile.email}</div>
          <div>Phone: {profile.phone}</div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Addresses</h3>
          {addresses.map(addr => (
            <div key={addr.id} className="mb-2 text-sm text-gray-700">
              <div>{addr.label}: {addr.street}, {addr.city}, {addr.state}, {addr.zip}, {addr.country}</div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-2">Order History</h3>
          <table className="w-full text-sm text-left">
            <thead>
              <tr><th>Date</th><th>Total</th><th>Status</th><th>Tracking</th></tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.date}</td>
                  <td>₹{order.total}</td>
                  <td>{order.status}</td>
                  <td>{order.tracking}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile; 