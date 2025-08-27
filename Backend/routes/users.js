const express = require('express');
const router = express.Router();

// In-memory users storage (in production, this would be in a database)
let users = new Map();

// Sample user data
const sampleUsers = [
  {
    id: 1,
    email: 'demo@bluorng.com',
    firstName: 'Demo',
    lastName: 'User',
    phone: '+91 9876543210',
    addresses: [
      {
        id: 1,
        type: 'shipping',
        firstName: 'Demo',
        lastName: 'User',
        address: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        country: 'India',
        phone: '+91 9876543210',
        isDefault: true
      }
    ],
    createdAt: '2024-01-01T10:00:00.000Z',
    updatedAt: '2024-01-01T10:00:00.000Z'
  }
];

// Initialize with sample data
sampleUsers.forEach(user => {
  users.set(user.id, user);
});

// GET /api/users/:id - Get user profile
router.get('/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Remove sensitive information
    const { password, ...userProfile } = user;

    res.json({
      success: true,
      data: userProfile
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch user' 
    });
  }
});

// PUT /api/users/:id - Update user profile
router.put('/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { firstName, lastName, phone } = req.body;

    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Update user fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    user.updatedAt = new Date().toISOString();

    users.set(userId, user);

    // Remove sensitive information
    const { password, ...userProfile } = user;

    res.json({
      success: true,
      data: userProfile,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update user' 
    });
  }
});

// GET /api/users/:id/addresses - Get user addresses
router.get('/:id/addresses', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user.addresses || []
    });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch addresses' 
    });
  }
});

// POST /api/users/:id/addresses - Add new address
router.post('/:id/addresses', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const {
      type,
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      country,
      phone,
      isDefault = false
    } = req.body;

    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (!user.addresses) {
      user.addresses = [];
    }

    const newAddress = {
      id: Date.now(),
      type,
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      country,
      phone,
      isDefault
    };

    // If this is the default address, unset other defaults
    if (isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses.push(newAddress);
    user.updatedAt = new Date().toISOString();

    users.set(userId, user);

    res.status(201).json({
      success: true,
      data: newAddress,
      message: 'Address added successfully'
    });
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to add address' 
    });
  }
});

// PUT /api/users/:id/addresses/:addressId - Update address
router.put('/:id/addresses/:addressId', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const addressId = parseInt(req.params.addressId);
    const updateData = req.body;

    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const addressIndex = user.addresses.findIndex(addr => addr.id === addressId);

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Address not found'
      });
    }

    // Update address
    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex],
      ...updateData
    };

    // If this is being set as default, unset other defaults
    if (updateData.isDefault) {
      user.addresses.forEach((addr, index) => {
        if (index !== addressIndex) {
          addr.isDefault = false;
        }
      });
    }

    user.updatedAt = new Date().toISOString();
    users.set(userId, user);

    res.json({
      success: true,
      data: user.addresses[addressIndex],
      message: 'Address updated successfully'
    });
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update address' 
    });
  }
});

// DELETE /api/users/:id/addresses/:addressId - Delete address
router.delete('/:id/addresses/:addressId', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const addressId = parseInt(req.params.addressId);

    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const addressIndex = user.addresses.findIndex(addr => addr.id === addressId);

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Address not found'
      });
    }

    user.addresses.splice(addressIndex, 1);
    user.updatedAt = new Date().toISOString();
    users.set(userId, user);

    res.json({
      success: true,
      message: 'Address deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete address' 
    });
  }
});

// GET /api/users/:id/wishlist - Get user wishlist
router.get('/:id/wishlist', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user.wishlist || []
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch wishlist' 
    });
  }
});

// POST /api/users/:id/wishlist - Add item to wishlist
router.post('/:id/wishlist', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { productId } = req.body;

    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (!user.wishlist) {
      user.wishlist = [];
    }

    // Check if product already in wishlist
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({
        success: false,
        error: 'Product already in wishlist'
      });
    }

    user.wishlist.push(productId);
    user.updatedAt = new Date().toISOString();
    users.set(userId, user);

    res.status(201).json({
      success: true,
      data: user.wishlist,
      message: 'Product added to wishlist'
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to add to wishlist' 
    });
  }
});

// DELETE /api/users/:id/wishlist/:productId - Remove item from wishlist
router.delete('/:id/wishlist/:productId', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const productId = parseInt(req.params.productId);

    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (!user.wishlist) {
      return res.status(404).json({
        success: false,
        error: 'Wishlist is empty'
      });
    }

    const productIndex = user.wishlist.indexOf(productId);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Product not found in wishlist'
      });
    }

    user.wishlist.splice(productIndex, 1);
    user.updatedAt = new Date().toISOString();
    users.set(userId, user);

    res.json({
      success: true,
      data: user.wishlist,
      message: 'Product removed from wishlist'
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to remove from wishlist' 
    });
  }
});

module.exports = router; 