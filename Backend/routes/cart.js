const express = require('express');
const router = express.Router();

// In-memory cart storage (in production, this would be in a database)
let carts = new Map();

// GET /api/cart/:userId - Get user's cart
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userCart = carts.get(userId) || [];

    res.json({
      success: true,
      data: userCart
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch cart' 
    });
  }
});

// POST /api/cart/:userId/add - Add item to cart
router.post('/:userId/add', async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity = 1, size, color } = req.body;

    if (!productId || !size || !color) {
      return res.status(400).json({
        success: false,
        error: 'Product ID, size, and color are required'
      });
    }

    let userCart = carts.get(userId) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = userCart.findIndex(item => 
      item.productId === productId && 
      item.size === size && 
      item.color === color
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      userCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      userCart.push({
        id: Date.now(), // Simple ID generation
        productId,
        quantity,
        size,
        color,
        addedAt: new Date().toISOString()
      });
    }

    carts.set(userId, userCart);

    res.json({
      success: true,
      data: userCart,
      message: 'Item added to cart successfully'
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to add item to cart' 
    });
  }
});

// PUT /api/cart/:userId/update/:itemId - Update cart item quantity
router.put('/:userId/update/:itemId', async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        error: 'Valid quantity is required'
      });
    }

    let userCart = carts.get(userId) || [];
    const itemIndex = userCart.findIndex(item => item.id === parseInt(itemId));

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Cart item not found'
      });
    }

    userCart[itemIndex].quantity = quantity;
    userCart[itemIndex].updatedAt = new Date().toISOString();

    carts.set(userId, userCart);

    res.json({
      success: true,
      data: userCart,
      message: 'Cart item updated successfully'
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update cart item' 
    });
  }
});

// DELETE /api/cart/:userId/remove/:itemId - Remove item from cart
router.delete('/:userId/remove/:itemId', async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    let userCart = carts.get(userId) || [];
    const itemIndex = userCart.findIndex(item => item.id === parseInt(itemId));

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Cart item not found'
      });
    }

    userCart.splice(itemIndex, 1);
    carts.set(userId, userCart);

    res.json({
      success: true,
      data: userCart,
      message: 'Item removed from cart successfully'
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to remove item from cart' 
    });
  }
});

// DELETE /api/cart/:userId/clear - Clear entire cart
router.delete('/:userId/clear', async (req, res) => {
  try {
    const { userId } = req.params;

    carts.set(userId, []);

    res.json({
      success: true,
      data: [],
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to clear cart' 
    });
  }
});

// GET /api/cart/:userId/count - Get cart item count
router.get('/:userId/count', async (req, res) => {
  try {
    const { userId } = req.params;
    const userCart = carts.get(userId) || [];
    
    const itemCount = userCart.reduce((total, item) => total + item.quantity, 0);

    res.json({
      success: true,
      data: { count: itemCount }
    });
  } catch (error) {
    console.error('Error getting cart count:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get cart count' 
    });
  }
});

module.exports = router; 