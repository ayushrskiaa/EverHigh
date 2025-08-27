import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { useCartWishlist } from '../context/CartWishlistContext';

const TABS = ['Details', 'Reviews', 'Recently Viewed'];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('Details');

  const {
    addToCart,
    isInCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  } = useCartWishlist();

  // Automatically select the only color if there is just one
  useEffect(() => {
    if (product && product.colors.length === 1) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  // Reviews demo state
  const [reviews, setReviews] = useState([
    { user: 'Alice', rating: 5, comment: 'Great quality!' },
    { user: 'Bob', rating: 4, comment: 'Nice design.' },
  ]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviews([...reviews, { user: 'You', ...newReview }]);
    setNewReview({ rating: 5, comment: '' });
  };

  // Pincode and expected delivery
  const [pincode, setPincode] = useState('');
  const [expectedDate, setExpectedDate] = useState('');

  const handlePincodeChange = (e) => {
    const value = e.target.value;
    setPincode(value);
    if (value.length >= 6) {
      let days = 6;
      if (value.startsWith('11')) days = 2;
      else if (value.startsWith('56')) days = 4;
      const date = new Date();
      date.setDate(date.getDate() + days);
      setExpectedDate(date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }));
    } else {
      setExpectedDate('');
    }
  };

  // Recently Viewed Products
  useEffect(() => {
    if (product) {
      let viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      viewed = viewed.filter(p => p.id !== product.id);
      viewed.unshift({ id: product.id, name: product.name, image: product.image });
      if (viewed.length > 10) viewed = viewed.slice(0, 10);
      localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
    }
  }, [product]);

  const [recentlyViewed, setRecentlyViewed] = useState([]);
  useEffect(() => {
    let viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setRecentlyViewed(viewed.filter(p => p.id !== product.id).slice(0, 6));
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/shop" className="text-blue-600 hover:underline">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  const cartItem = { product, size: selectedSize, color: selectedColor, quantity };
  const wishlistItem = { product, size: selectedSize, color: selectedColor };

  const outOfStock = product.inStock === false;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    if (product.colors.length > 1 && !selectedColor) {
      alert('Please select a color');
      return;
    }
    if (outOfStock) {
      alert('This product is out of stock.');
      return;
    }
    addToCart(cartItem);
  };

  const handleWishlistToggle = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to wishlist');
      return;
    }
    if (product.colors.length > 1 && !selectedColor) {
      alert('Please select a color before adding to wishlist');
      return;
    }
    if (isInWishlist(wishlistItem)) {
      removeFromWishlist(wishlistItem);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const inCart = isInCart(cartItem);
  const inWishlist = isInWishlist(wishlistItem);

  // For star rendering
  const renderStars = (rating) => (
    <span className="text-yellow-500">
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl w-11/12 mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-black">Home</Link></li>
            <li>/</li>
            <li><Link to="/shop" className="hover:text-black">Shop</Link></li>
            <li>/</li>
            <li className="text-black">{product.name}</li>
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left: Images */}
          <div className="md:w-1/2 w-full flex flex-col items-center">
            <img
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-[32rem] object-cover rounded-xl shadow-lg mb-4"
            />
            <div className="flex gap-3 mt-2">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={product.name + ' thumbnail'}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${selectedImage === idx ? 'border-black scale-105' : 'border-gray-200'}`}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="md:w-1/2 w-full flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-black">RS. {product.price.toLocaleString()}</span>
                {product.originalPrice !== product.price && (
                  <span className="ml-2 text-lg text-gray-500 line-through">RS. {product.originalPrice.toLocaleString()}</span>
                )}
                {product.newArrival && (
                  <span className="bg-black text-white px-2 py-1 text-xs font-semibold">NEW</span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Size</h3>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-700 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? 'border-black' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-2">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 font-semibold flex items-center justify-center space-x-2 transition-colors
                  ${inCart ? 'bg-green-600 text-white hover:bg-green-700' : outOfStock ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                disabled={inCart || outOfStock}
              >
                <ShoppingBag size={20} />
                <span>{outOfStock ? 'Out of Stock' : inCart ? 'Added to Cart' : 'Add to Cart'}</span>
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`p-4 border-2 transition-colors ${
                  inWishlist
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-300 text-gray-700 hover:border-black'
                }`}
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Delivery by Pincode */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Check Delivery Date</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={handlePincodeChange}
                  maxLength={6}
                  placeholder="Enter Pincode"
                  className="border px-3 py-2 rounded w-40"
                />
                {expectedDate && (
                  <span className="text-green-700 font-semibold">Expected by {expectedDate}</span>
                )}
              </div>
            </div>

            {/* Stock Status */}
            {outOfStock && <div className="text-red-600 font-semibold mt-2">This product is currently out of stock.</div>}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="flex gap-6 border-b mb-6">
            {TABS.map(t => (
              <button
                key={t}
                className={`pb-2 px-2 text-lg font-semibold border-b-2 transition-colors ${tab === t ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          {tab === 'Details' && (
            <div>
              <h3 className="text-lg font-bold mb-2">Product Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Material:</strong> Premium cotton</p>
                <p><strong>Fit:</strong> Regular fit</p>
                <p><strong>Care:</strong> Machine wash cold</p>
                <p><strong>Origin:</strong> Made in India</p>
              </div>
            </div>
          )}
          {tab === 'Reviews' && (
            <div>
              <h3 className="text-lg font-bold mb-2">Customer Reviews</h3>
              {reviews.length === 0 ? (
                <div className="text-gray-500">No reviews yet.</div>
              ) : (
                <ul className="mb-4">
                  {reviews.map((r, idx) => (
                    <li key={idx} className="mb-2 border-b pb-2">
                      <span className="font-semibold">{r.user}</span> - {renderStars(r.rating)}<br />
                      <span>{r.comment}</span>
                    </li>
                  ))}
                </ul>
              )}
              <form onSubmit={handleReviewSubmit} className="space-y-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Rating</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(n => (
                      <button
                        key={n}
                        type="button"
                        className="text-2xl focus:outline-none"
                        onClick={() => setNewReview({ ...newReview, rating: n })}
                        aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
                      >
                        <span className={n <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Your Review</label>
                  <textarea name="comment" value={newReview.comment} onChange={handleReviewChange} className="border rounded px-2 py-1 w-full" required />
                </div>
                <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Submit Review</button>
              </form>
            </div>
          )}
          {tab === 'Recently Viewed' && recentlyViewed.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4">Recently Viewed</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {recentlyViewed.map(p => (
                  <a key={p.id} href={`/product/${p.id}`} className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-32 object-cover" />
                    <div className="p-2 text-xs text-center font-medium text-gray-800 line-clamp-2">{p.name}</div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 