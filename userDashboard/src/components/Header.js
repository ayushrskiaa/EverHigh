import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User, Heart } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { FiHome } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const { cart, wishlist } = useCartWishlist();

  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-gradient-to-r from-red-500 to-orange-500">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white text-center py-2 text-sm font-bold">
        <p className="animate-pulse">🔥 NEW DROP LIVE - FREE SHIPPING WORLDWIDE 🔥</p>
      </div>

      {/* Main header */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Home Icon Button */}
          <Link to="/" className="-ml-2 mr-4 hidden sm:flex items-center text-gray-700 hover:text-red-500 transition-colors" aria-label="Home">
            <FiHome size={28} />
          </Link>
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center">
              <div className="text-3xl font-black text-gradient-primary">
                EVER HIGH
              </div>
              <div className="ml-2 w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/shop" className="text-gray-700 hover:text-red-500 transition-colors font-semibold">
              SHOP ALL
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-red-500 transition-colors font-semibold">
                APPAREL
              </button>
              <div className="absolute top-full left-0 bg-white shadow-xl border-2 border-red-200 py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 rounded-lg">
                <Link to="/shop?category=top-wear" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500">Top Wear</Link>
                <Link to="/shop?category=bottom-wear" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500">Bottom Wear</Link>
                <Link to="/shop?category=accessories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500">Accessories</Link>
                <Link to="/shop?category=t-shirts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500">T-Shirts</Link>
                <Link to="/shop?category=hoodies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500">Hoodies</Link>
                <Link to="/shop?category=jackets" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500">Jackets</Link>
              </div>
            </div>
            <Link to="/stores" className="text-gray-700 hover:text-red-500 transition-colors font-semibold">
              STORES
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4 relative">
            {/* User Dropdown or Login */}
            {user ? (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-gray-700 hover:text-red-500 transition-colors flex items-center focus:outline-none">
                  <User size={24} />
                  <span className="ml-2 hidden sm:inline-block font-semibold">{user.email}</span>
                  <svg className={`ml-1 w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50 border">
                    <div className="flex items-center mb-2">
                      <User size={24} className="mr-2" />
                      <span className="font-semibold">{user.email}</span>
                    </div>
                    <hr className="my-2" />
                    <ul className="space-y-2">
                      <li><Link to="/profile" className="hover:underline">Profile</Link></li>
                      <li><Link to="/settings" className="hover:underline">Settings</Link></li>
                      <li><button onClick={logout} className="text-left w-full hover:underline">Log out</button></li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-red-500 transition-colors">
                <User size={20} />
              </Link>
            )}

            {/* Wishlist */}
            <Link to="/wishlist" className="text-gray-700 hover:text-red-500 transition-colors relative">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="cart-icon-header text-gray-700 hover:text-red-500 transition-colors relative">
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button onClick={toggleMenu} className="md:hidden text-gray-700 hover:text-red-500 transition-colors">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      {isSearchOpen && (
        <div className="bg-white border-t-2 border-red-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for your style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-500 focus-street"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search size={20} className="text-red-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t-2 border-red-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/shop" className="block px-3 py-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-md">
              SHOP ALL
            </Link>
            <div className="px-3 py-2">
              <div className="text-gray-700 font-medium mb-2">APPAREL</div>
              <div className="pl-4 space-y-1">
                <Link to="/shop?category=top-wear" className="block text-sm text-gray-600 hover:text-red-500">Top Wear</Link>
                <Link to="/shop?category=bottom-wear" className="block text-sm text-gray-600 hover:text-red-500">Bottom Wear</Link>
                <Link to="/shop?category=accessories" className="block text-sm text-gray-600 hover:text-red-500">Accessories</Link>
                <Link to="/shop?category=t-shirts" className="block text-sm text-gray-600 hover:text-red-500">T-Shirts</Link>
                <Link to="/shop?category=hoodies" className="block text-sm text-gray-600 hover:text-red-500">Hoodies</Link>
                <Link to="/shop?category=jackets" className="block text-sm text-gray-600 hover:text-red-500">Jackets</Link>
              </div>
            </div>
            <Link to="/stores" className="block px-3 py-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-md">
              STORES
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 