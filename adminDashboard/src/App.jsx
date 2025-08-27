import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { Menu, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => (
  <aside
    className={`bg-gray-900 text-white w-64 min-h-screen flex flex-col fixed md:static top-0 left-0 transform transition-transform duration-300 z-50
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
  >
    <div className="text-2xl font-bold px-6 py-6 border-b border-gray-800 tracking-widest flex items-center justify-between">
      ADMIN
      <button className="md:hidden" onClick={onClose}>
        <X size={24} />
      </button>
    </div>
    <nav className="flex-1 px-4 py-6 space-y-2">
      <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-800" onClick={onClose}>Dashboard</Link>
      <Link to="/products" className="block px-4 py-2 rounded hover:bg-gray-800" onClick={onClose}>Products</Link>
      <Link to="/orders" className="block px-4 py-2 rounded hover:bg-gray-800" onClick={onClose}>Orders</Link>
      <Link to="/users" className="block px-4 py-2 rounded hover:bg-gray-800" onClick={onClose}>Users</Link>
      <Link to="/analytics" className="block px-4 py-2 rounded hover:bg-gray-800" onClick={onClose}>Analytics</Link>
      <Link to="/settings" className="block px-4 py-2 rounded hover:bg-gray-800" onClick={onClose}>Settings</Link>
    </nav>
    <div className="px-6 py-4 border-t border-gray-800 text-xs text-gray-400">&copy; 2025 EVER HIGH</div>
  </aside>
);

const Header = ({ toggleSidebar, onProfileClick }) => (
  <header className="bg-white shadow px-8 py-4 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <button className="md:hidden" onClick={toggleSidebar}>
        <Menu size={28} />
      </button>
      <div className="text-xl font-bold tracking-widest text-gray-900">EVER HIGH Admin Dashboard</div>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-gray-600 text-sm">Admin</span>
      <img
        src="https://ui-avatars.com/api/?name=Admin"
        alt="Admin"
        className="w-8 h-8 rounded-full cursor-pointer"
        onClick={onProfileClick}
      />
    </div>
  </header>
);

const ProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-4">Admin Profile</h2>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Name:</span> Admin</p>
          <p><span className="font-semibold">Email:</span> admin@example.com</p>
          <p><span className="font-semibold">Role:</span> Super Admin</p>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Close
          </button>
          <button
            onClick={() => alert('Logging out...')}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 flex flex-col bg-gray-50">
          <Header
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onProfileClick={() => setIsProfileOpen(true)}
          />
          <main className="flex-1 p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/users" element={<Users />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </Router>
  );
};

export default App;
