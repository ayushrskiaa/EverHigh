import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart, isInCart } = useCartWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your wishlist yet.</p>
            <Link
              to="/shop"
              className="inline-flex items-center bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Wishlist</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wishlist Items */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-black">
                  Wishlisted Items ({wishlist.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {wishlist.map((item, idx) => (
                  <div key={idx} className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-black mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <p className="text-lg font-bold text-black">
                          RS. {item.product.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => { if (!isInCart(item)) addToCart(item); }}
                        className={`bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors mr-2 ${isInCart(item) ? 'opacity-60 cursor-not-allowed' : ''}`}
                        disabled={isInCart(item)}
                      >
                        <ShoppingBag size={18} className="inline-block mr-1" />
                        {isInCart(item) ? 'Already Added' : 'Add to Cart'}
                      </button>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromWishlist(item)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist; 