import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      if (email === 'user@example.com' && password === 'password') {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
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
              <span className="text-3xl font-black text-gradient-primary">Ever High</span>
              <span className="ml-2 w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse"></span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Ever High!</h2>
            <p className="text-gray-500">Sign in to your Ever High account and join the streetwear movement.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus-street text-gray-900 bg-gray-50"
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
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus-street text-gray-900 bg-gray-50"
                  placeholder="Your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && <div className="text-red-500 text-sm font-semibold text-center">{error}</div>}
            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center space-x-2 pulse-glow disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <LogIn size={20} />
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between text-sm">
            <Link to="/register" className="text-red-500 hover:underline font-semibold">
              New to Ever High? Create an account
            </Link>
            <button className="text-gray-500 hover:text-red-500 hover:underline font-semibold">
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 