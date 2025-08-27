import React, { createContext, useContext, useState } from 'react';

const CartWishlistContext = createContext();

export const useCartWishlist = () => useContext(CartWishlistContext);

export const CartWishlistProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // [{product, size, color, quantity}]
  const [wishlist, setWishlist] = useState([]); // [{product, size, color}]

  // Cart functions
  const addToCart = (item) => {
    if (!cart.some(
      (i) => i.product.id === item.product.id && i.size === item.size && i.color === item.color
    )) {
      setCart([...cart, { ...item, quantity: item.quantity || 1 }]);
    }
  };
  const removeFromCart = (item) => {
    setCart(cart.filter(
      (i) => !(i.product.id === item.product.id && i.size === item.size && i.color === item.color)
    ));
  };
  const isInCart = (item) =>
    cart.some(
      (i) => i.product.id === item.product.id && i.size === item.size && i.color === item.color
    );

  // Wishlist functions
  const addToWishlist = (item) => {
    if (!wishlist.some(
      (i) => i.product.id === item.product.id && i.size === item.size && i.color === item.color
    )) {
      setWishlist([...wishlist, item]);
    }
  };
  const removeFromWishlist = (item) => {
    setWishlist(wishlist.filter(
      (i) => !(i.product.id === item.product.id && i.size === item.size && i.color === item.color)
    ));
  };
  const isInWishlist = (item) =>
    wishlist.some(
      (i) => i.product.id === item.product.id && i.size === item.size && i.color === item.color
    );

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        isInCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
}; 