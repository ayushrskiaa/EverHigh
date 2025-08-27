import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

const Cart = () => {
  const { cart, removeFromCart } = useCartWishlist();
  const [coupon, setCoupon] = React.useState('');
  const [discount, setDiscount] = React.useState(0);

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    // For demo, just update quantity in-place (real app: update context)
    item.quantity = newQuantity;
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  const handleApplyCoupon = () => {
    // Simple demo: 'SAVE10' gives 10% off
    if (coupon === 'SAVE10') {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
      alert('Invalid coupon code');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
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
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-black">
                  Cart Items ({cart.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {cart.map((item, idx) => (
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
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item, (item.quantity || 1) - 1)}
                          className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(item, (item.quantity || 1) + 1)}
                          className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item)}
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
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-black mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">RS. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'Free' : `RS. ${shipping.toLocaleString()}`}
                  </span>
                </div>
                {/* Coupon Code */}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="border px-2 py-1 rounded w-2/3"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-RS. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-black">Total</span>
                    <span className="text-lg font-bold text-black">
                      RS. {(total - discount).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                className="w-full bg-black text-white py-4 px-6 font-semibold hover:bg-gray-800 transition-colors mt-6"
                onClick={() => window.location.href = '/address'}
              >
                Proceed to Checkout
              </button>
              <div className="mt-4 text-center">
                <Link to="/shop" className="text-sm text-gray-600 hover:text-black">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 