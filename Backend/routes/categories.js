const express = require('express');
const router = express.Router();

// Sample categories data
const categories = [
  { id: 1, name: "Top Wear", slug: "top-wear", description: "Premium tops and shirts" },
  { id: 2, name: "Bottom Wear", slug: "bottom-wear", description: "Pants, jeans, and shorts" },
  { id: 3, name: "Accessories", slug: "accessories", description: "Bags, caps, and accessories" },
  { id: 4, name: "T-Shirts", slug: "t-shirts", description: "Premium cotton t-shirts" },
  { id: 5, name: "Hoodies", slug: "hoodies", description: "Comfortable hoodies and sweatshirts" },
  { id: 6, name: "Jackets", slug: "jackets", description: "Stylish jackets and outerwear" },
  { id: 7, name: "Cargos", slug: "cargos", description: "Functional cargo pants" },
  { id: 8, name: "Jeans", slug: "jeans", description: "Premium denim jeans" },
  { id: 9, name: "Pants", slug: "pants", description: "Casual and formal pants" },
  { id: 10, name: "Shorts", slug: "shorts", description: "Comfortable shorts" },
  { id: 11, name: "Polos", slug: "polos", description: "Classic polo shirts" },
  { id: 12, name: "Shirts", slug: "shirts", description: "Formal and casual shirts" },
  { id: 13, name: "Sweatshirts", slug: "sweatshirts", description: "Cozy sweatshirts" }
];

// GET /api/categories - Get all categories
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch categories' 
    });
  }
});

// GET /api/categories/:id - Get single category
router.get('/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = categories.find(c => c.id === categoryId);

    if (!category) {
      return res.status(404).json({ 
        success: false, 
        error: 'Category not found' 
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch category' 
    });
  }
});

// GET /api/categories/slug/:slug - Get category by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const category = categories.find(c => c.slug === slug);

    if (!category) {
      return res.status(404).json({ 
        success: false, 
        error: 'Category not found' 
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch category' 
    });
  }
});

module.exports = router; 