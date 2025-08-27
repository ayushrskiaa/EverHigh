const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Load products data
let products = [];
const loadProducts = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8');
    products = JSON.parse(data);
  } catch (error) {
    console.error('Error loading products:', error);
    products = [];
  }
};

// Initialize products on startup
loadProducts();

// GET /api/products - Get all products with optional filtering
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      featured, 
      newArrival, 
      inStock, 
      minPrice, 
      maxPrice, 
      sortBy, 
      limit = 20, 
      page = 1 
    } = req.query;

    let filteredProducts = [...products];

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    // Filter by featured
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(product => product.featured === true);
    }

    // Filter by new arrival
    if (newArrival === 'true') {
      filteredProducts = filteredProducts.filter(product => product.newArrival === true);
    }

    // Filter by stock
    if (inStock === 'true') {
      filteredProducts = filteredProducts.filter(product => product.inStock === true);
    }

    // Filter by price range
    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => product.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => product.price <= parseInt(maxPrice));
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Featured sorting (new arrivals first, then featured)
        filteredProducts.sort((a, b) => {
          if (a.newArrival && !b.newArrival) return -1;
          if (!a.newArrival && b.newArrival) return 1;
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredProducts.length / parseInt(limit)),
        totalProducts: filteredProducts.length,
        productsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch products' 
    });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found' 
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch product' 
    });
  }
});

// GET /api/products/featured/featured - Get featured products
router.get('/featured/featured', async (req, res) => {
  try {
    const featuredProducts = products.filter(product => product.featured);
    res.json({
      success: true,
      data: featuredProducts
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch featured products' 
    });
  }
});

// GET /api/products/new-arrivals - Get new arrival products
router.get('/new-arrivals', async (req, res) => {
  try {
    const newArrivals = products.filter(product => product.newArrival);
    res.json({
      success: true,
      data: newArrivals
    });
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch new arrivals' 
    });
  }
});

// GET /api/products/search/:query - Search products
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query.toLowerCase();
    const searchResults = products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );

    res.json({
      success: true,
      data: searchResults
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to search products' 
    });
  }
});

module.exports = router; 