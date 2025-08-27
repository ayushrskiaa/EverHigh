import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Stores from './pages/Stores';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import Address from './pages/Address';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import Profile from './pages/Profile';
import ReturnPolicy from './pages/ReturnPolicy';
import { CartWishlistProvider } from './context/CartWishlistContext';

function App() {
  return (
    <Router>
      <CartWishlistProvider>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/address" element={<Address />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartWishlistProvider>
    </Router>
  );
}

export default App; 