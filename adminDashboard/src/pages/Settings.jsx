import React from 'react';

const Settings = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Settings</h1>
    <div className="bg-white rounded-xl shadow p-8">
      <h2 className="text-lg font-semibold mb-4">Admin Profile</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" className="border px-4 py-2 rounded w-full" value="Admin" readOnly />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" className="border px-4 py-2 rounded w-full" value="admin@everhigh.com" readOnly />
      </div>
      <h2 className="text-lg font-semibold mb-4 mt-8">Platform Settings</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Store Name</label>
        <input type="text" className="border px-4 py-2 rounded w-full" value="EVER HIGH" readOnly />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Support Email</label>
        <input type="email" className="border px-4 py-2 rounded w-full" value="support@everhigh.com" readOnly />
      </div>
    </div>
  </div>
);

export default Settings; 