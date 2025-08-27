const express = require('express');
const router = express.Router();

// In-memory orders storage (in production, this would be in a database)
let orders = new Map();
let orderCounter = 1000; // Starting order number

// GET /api/orders/:userId - Get user's orders
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userOrders = orders.get(userId) || [];

    res.json({
      success: true,
      data: userOrders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch orders' 
    });
  }
});

// GET /api/orders/:userId/:orderId - Get specific order
router.get('/:userId/:orderId', async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    const userOrders = orders.get(userId) || [];
    const order = userOrders.find(o => o.orderId === orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch order' 
    });
  }
});

// POST /api/orders/:userId/create - Create new order
router.post('/:userId/create', async (req, res) => {
  try {
    const { userId } = req.params;
    const { 
      items, 
      shippingAddress, 
      billingAddress, 
      paymentMethod,
      subtotal,
      shipping,
      tax,
      total 
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Order must contain at least one item'
      });
    }

    if (!shippingAddress || !billingAddress) {
      return res.status(400).json({
        success: false,
        error: 'Shipping and billing addresses are required'
      });
    }

    const orderId = `BLU${++orderCounter}`;
    const order = {
      orderId,
      userId,
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      subtotal,
      shipping,
      tax,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let userOrders = orders.get(userId) || [];
    userOrders.push(order);
    orders.set(userId, userOrders);

    res.status(201).json({
      success: true,
      data: order,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create order' 
    });
  }
});

// PUT /api/orders/:userId/:orderId/status - Update order status
router.put('/:userId/:orderId/status', async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid order status'
      });
    }

    let userOrders = orders.get(userId) || [];
    const orderIndex = userOrders.findIndex(o => o.orderId === orderId);

    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    userOrders[orderIndex].status = status;
    userOrders[orderIndex].updatedAt = new Date().toISOString();

    orders.set(userId, userOrders);

    res.json({
      success: true,
      data: userOrders[orderIndex],
      message: 'Order status updated successfully'
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update order status' 
    });
  }
});

// DELETE /api/orders/:userId/:orderId - Cancel order
router.delete('/:userId/:orderId', async (req, res) => {
  try {
    const { userId, orderId } = req.params;

    let userOrders = orders.get(userId) || [];
    const orderIndex = userOrders.findIndex(o => o.orderId === orderId);

    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Only allow cancellation of pending or confirmed orders
    if (!['pending', 'confirmed'].includes(userOrders[orderIndex].status)) {
      return res.status(400).json({
        success: false,
        error: 'Order cannot be cancelled at this stage'
      });
    }

    userOrders[orderIndex].status = 'cancelled';
    userOrders[orderIndex].updatedAt = new Date().toISOString();

    orders.set(userId, userOrders);

    res.json({
      success: true,
      data: userOrders[orderIndex],
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to cancel order' 
    });
  }
});

// GET /api/orders/:userId/tracking/:orderId - Get order tracking info
router.get('/:userId/tracking/:orderId', async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    const userOrders = orders.get(userId) || [];
    const order = userOrders.find(o => o.orderId === orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Mock tracking information
    const trackingInfo = {
      orderId: order.orderId,
      status: order.status,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      trackingNumber: `TRK${orderId}`,
      updates: [
        {
          status: 'Order Placed',
          timestamp: order.createdAt,
          description: 'Your order has been placed successfully'
        },
        {
          status: 'Order Confirmed',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Your order has been confirmed and is being processed'
        }
      ]
    };

    res.json({
      success: true,
      data: trackingInfo
    });
  } catch (error) {
    console.error('Error fetching tracking info:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch tracking information' 
    });
  }
});

module.exports = router; 