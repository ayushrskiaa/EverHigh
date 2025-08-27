import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    // Simulate registration
    setTimeout(() => {
      setLoading(false);
      setSuccess('Account created! Redirecting...');
      setTimeout(() => navigate('/login'), 1200);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500">
      <div className="flex items-center justify-center w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md border-4 border-gradient-to-r from-blue-500 to-purple-500 min-h-[500px] flex flex-col justify-center">
          {/* Toggle between Login/Register */}
          <div className="flex items-center justify-center mb-8">
            <button
              className={`px-6 py-2 rounded-l-full font-bold transition-all duration-200 border-r border-gray-200 focus:outline-none ${location.pathname === '/login' ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => navigate('/login')}
              type="button"
              disabled={location.pathname === '/login'}
            >
              <LogIn className="inline mr-2 mb-1" size={18} /> Login
            </button>
            <button
              className={`px-6 py-2 rounded-r-full font-bold transition-all duration-200 border-l border-gray-200 focus:outline-none ${location.pathname === '/register' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => navigate('/register')}
              type="button"
              disabled={location.pathname === '/register'}
            >
              <UserPlus className="inline mr-2 mb-1" size={18} /> Register
            </button>
          </div>
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-3xl font-black text-gradient-secondary">Ever High</span>
              <span className="ml-2 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Ever High Account</h2>
            <p className="text-gray-500">Join the Ever High streetwear revolution and unlock exclusive drops.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus-street text-gray-900 bg-gray-50"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus-street text-gray-900 bg-gray-50"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus-street text-gray-900 bg-gray-50"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus-street text-gray-900 bg-gray-50"
                  placeholder="Repeat your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
                  onClick={() => setShowConfirm((v) => !v)}
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && <div className="text-red-500 text-sm font-semibold text-center">{error}</div>}
            {success && <div className="text-green-500 text-sm font-semibold text-center">{success}</div>}
            <button
              type="submit"
              className="w-full btn-secondary flex items-center justify-center space-x-2 pulse-glow disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <UserPlus size={20} />
              <span>{loading ? 'Creating...' : 'Create Account'}</span>
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between text-sm">
            <Link to="/login" className="text-blue-500 hover:underline font-semibold">
              Already a member? Sign in to Ever High
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 