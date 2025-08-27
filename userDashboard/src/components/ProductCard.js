import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

const flyToCart = (imgRef, cartIconSelector) => {
  const img = imgRef.current;
  const cartIcon = document.querySelector(cartIconSelector);
  if (!img || !cartIcon) return;

  const imgRect = img.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  const flyingImg = img.cloneNode(true);
  flyingImg.style.position = 'fixed';
  flyingImg.style.left = imgRect.left + 'px';
  flyingImg.style.top = imgRect.top + 'px';
  flyingImg.style.width = imgRect.width + 'px';
  flyingImg.style.height = imgRect.height + 'px';
  flyingImg.style.zIndex = 9999;
  flyingImg.style.transition = 'all 0.8s cubic-bezier(.6,-0.28,.74,.05)';
  flyingImg.style.borderRadius = '16px';
  document.body.appendChild(flyingImg);

  setTimeout(() => {
    flyingImg.style.left = cartRect.left + cartRect.width / 2 - imgRect.width / 4 + 'px';
    flyingImg.style.top = cartRect.top + cartRect.height / 2 - imgRect.height / 4 + 'px';
    flyingImg.style.width = imgRect.width / 2 + 'px';
    flyingImg.style.height = imgRect.height / 2 + 'px';
    flyingImg.style.opacity = '0.5';
  }, 10);

  setTimeout(() => {
    document.body.removeChild(flyingImg);
  }, 850);
};

const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, addToWishlist, isInCart, isInWishlist, removeFromCart, removeFromWishlist } = useCartWishlist();
  const imgRef = useRef(null);

  // For demo, use first size/color if available
  const size = product.sizes ? product.sizes[0] : 'M';
  const color = product.colors ? product.colors[0] : 'Black';
  const item = { product, size, color };

  const outOfStock = product.inStock === false;

  const handleCartClick = (e) => {
    e.preventDefault();
    if (isInCart(item) || outOfStock) {
      return;
    }
    addToCart(item);
    flyToCart(imgRef, '.cart-icon-header');
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (isInWishlist(item)) {
      removeFromWishlist(item);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border-2 border-gray-100 hover:border-red-200 h-full flex flex-col">
        {/* Product Image */}
        <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex-shrink-0">
          <img
            ref={imgRef}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Hover Overlay */}
          <div className={`absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4`}>
            <div className="flex space-x-2">
              <button
                onClick={e => { e.preventDefault(); if (!isInCart(item)) addToCart(item); }}
                className={`w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-110 ${isInCart(item) ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={isInCart(item)}
              >
                <ShoppingBag size={16} />
              </button>
              <button
                onClick={handleWishlistClick}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                  isInWishlist(item)
                    ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-red-50'
                }`}
              >
                <Heart size={16} fill={isInWishlist(item) ? 'currentColor' : 'none'} />
              </button>
              <button
                className="w-10 h-10 bg-white text-gray-700 rounded-full flex items-center justify-center hover:bg-blue-50 transition-all duration-300 transform hover:scale-110"
                onClick={e => { e.preventDefault(); if (onQuickView) onQuickView(product); }}
                type="button"
              >
                <Eye size={16} />
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.newArrival && (
              <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                NEW
              </span>
            )}
            {product.featured && (
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                FEATURED
              </span>
            )}
            {outOfStock && (
              <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                OUT OF STOCK
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isInWishlist(item)
                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart size={14} fill={isInWishlist(item) ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-1 justify-between">
          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          {/* Sizes and Colors */}
          <div className="flex items-center mb-2 space-x-3">
            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <span className="text-xs text-gray-500">Sizes: {product.sizes.join(', ')}</span>
            )}
            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <span className="flex items-center space-x-1">
                {product.colors.map((color, idx) => (
                  <span
                    key={idx}
                    className="inline-block w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-black text-red-600">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice !== product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            
            {product.originalPrice !== product.price && (
              <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Category */}
          <div className="flex items-center justify-between">
            {/* <span className="text-sm text-gray-600 capitalize bg-gray-100 px-2 py-1 rounded-full">
              {product.category}
            </span> */}
            
            {/* Quick Add to Cart */}
            <button
              onClick={handleCartClick}
              className={`h-9 px-6 text-xs font-bold rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center
                ${isInCart(item) || outOfStock
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white'}
              `}
              style={{ minWidth: '120px' }}
              disabled={isInCart(item) || outOfStock}
            >
              {outOfStock ? 'Out of Stock' : isInCart(item) ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 