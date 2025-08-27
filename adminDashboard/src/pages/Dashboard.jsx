import React from 'react';

const stats = [
  { label: 'Total Sales', value: '₹2,40,000', color: 'bg-green-100 text-green-800' },
  { label: 'Orders', value: '1,200', color: 'bg-blue-100 text-blue-800' },
  { label: 'Users', value: '850', color: 'bg-yellow-100 text-yellow-800' },
  { label: 'Revenue', value: '₹1,80,000', color: 'bg-purple-100 text-purple-800' },
  
];

const Dashboard = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className={`rounded-xl p-6 shadow ${stat.color}`}>
          <div className="text-lg font-semibold mb-2">{stat.label}</div>
          <div className="text-3xl font-bold">{stat.value}</div>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-xl shadow p-8">
      <h2 className="text-xl font-bold mb-4">Welcome, Admin!</h2>
      <p className="text-gray-700">Use the sidebar to manage products, orders, users, categories, and view analytics. This dashboard gives you a quick overview of your e-commerce platform's performance.</p>
    </div>
  </div>
);

export default Dashboard; 