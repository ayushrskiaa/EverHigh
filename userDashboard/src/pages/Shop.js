import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [newArrivalsOnly, setNewArrivalsOnly] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const category = searchParams.get('category');

  // Get all unique colors and sizes from products
  const allColors = Array.from(new Set(products.flatMap(p => p.colors)));
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (category) {
      filtered = filtered.filter(product => product.category === category);
      setSelectedCategory(category);
    } else {
      setSelectedCategory('');
    }

    // Filter by price
    if (selectedPrice.length > 0) {
      filtered = filtered.filter(product => {
        return selectedPrice.some(range => {
          if (range === 'under-2000') return product.price < 2000;
          if (range === '2000-4000') return product.price >= 2000 && product.price <= 4000;
          if (range === '4000-6000') return product.price > 4000 && product.price <= 6000;
          if (range === 'over-6000') return product.price > 6000;
          return false;
        });
      });
    }

    // Filter by color
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors && product.colors.some(color => selectedColors.includes(color))
      );
    }

    // Filter by size
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes && product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Filter by in stock
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Filter by new arrivals
    if (newArrivalsOnly) {
      filtered = filtered.filter(product => product.newArrival);
    }

    // Filter by search
    if (search.trim() !== "") {
      const searchTerm = search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        (product.colors && product.colors.some(color => color.toLowerCase().includes(searchTerm)))
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured sorting (new arrivals first, then featured)
        filtered.sort((a, b) => {
          if (a.newArrival && !b.newArrival) return -1;
          if (!a.newArrival && b.newArrival) return 1;
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }

    setFilteredProducts(filtered);
  }, [category, sortBy, search, selectedPrice, selectedColors, selectedSizes, inStockOnly, newArrivalsOnly]);

  const handleCategoryChange = (categorySlug) => {
    if (categorySlug === selectedCategory) {
      setSelectedCategory('');
      setSearchParams({});
    } else {
      setSelectedCategory(categorySlug);
      setSearchParams({ category: categorySlug });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-black mb-4">SHOP ALL</h1>
          <p className="text-gray-600">
            Discover our premium streetwear collection
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-black">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden"
                >
                  <Filter size={20} />
                </button>
              </div>

              <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block space-y-6`}>
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.slug} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategory === cat.slug}
                          onChange={() => handleCategoryChange(cat.slug)}
                          className="rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="ml-2 text-sm text-gray-700">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" checked={selectedPrice.includes('under-2000')} onChange={e => setSelectedPrice(p => e.target.checked ? [...p, 'under-2000'] : p.filter(x => x !== 'under-2000'))} className="rounded border-gray-300 text-black focus:ring-black" />
                      <span className="ml-2 text-sm text-gray-700">Under RS. 2,000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={selectedPrice.includes('2000-4000')} onChange={e => setSelectedPrice(p => e.target.checked ? [...p, '2000-4000'] : p.filter(x => x !== '2000-4000'))} className="rounded border-gray-300 text-black focus:ring-black" />
                      <span className="ml-2 text-sm text-gray-700">RS. 2,000 - RS. 4,000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={selectedPrice.includes('4000-6000')} onChange={e => setSelectedPrice(p => e.target.checked ? [...p, '4000-6000'] : p.filter(x => x !== '4000-6000'))} className="rounded border-gray-300 text-black focus:ring-black" />
                      <span className="ml-2 text-sm text-gray-700">RS. 4,000 - RS. 6,000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={selectedPrice.includes('over-6000')} onChange={e => setSelectedPrice(p => e.target.checked ? [...p, 'over-6000'] : p.filter(x => x !== 'over-6000'))} className="rounded border-gray-300 text-black focus:ring-black" />
                      <span className="ml-2 text-sm text-gray-700">Over RS. 6,000</span>
                    </label>
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {allColors.map(color => (
                      <label key={color} className="flex items-center space-x-1">
                        <input type="checkbox" checked={selectedColors.includes(color)} onChange={e => setSelectedColors(c => e.target.checked ? [...c, color] : c.filter(x => x !== color))} className="rounded border-gray-300 text-black focus:ring-black" />
                        <span className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: color.toLowerCase() }} title={color}></span>
                        <span className="text-xs text-gray-700">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map(size => (
                      <label key={size} className="flex items-center space-x-1">
                        <input type="checkbox" checked={selectedSizes.includes(size)} onChange={e => setSelectedSizes(s => e.target.checked ? [...s, size] : s.filter(x => x !== size))} className="rounded border-gray-300 text-black focus:ring-black" />
                        <span className="text-xs text-gray-700">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Availability</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} className="rounded border-gray-300 text-black focus:ring-black" />
                      <span className="ml-2 text-sm text-gray-700">In Stock</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={newArrivalsOnly} onChange={e => setNewArrivalsOnly(e.target.checked)} className="rounded border-gray-300 text-black focus:ring-black" />
                      <span className="ml-2 text-sm text-gray-700">New Arrivals</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {filteredProducts.length} products
                  </span>
                </div>
                <div className="flex-1 flex items-center space-x-4">
                  {/* Search */}
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name, color, category..."
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent w-full sm:w"
                  />
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      <Grid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms.</p>
              </div>
            )}

            {/* Quick View Modal */}
            {quickViewProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={() => setQuickViewProduct(null)}>&times;</button>
                  <div className="flex flex-col md:flex-row gap-6">
                    <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-48 h-64 object-cover rounded" />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{quickViewProduct.name}</h2>
                      <p className="text-lg font-semibold text-red-600 mb-2">₹{quickViewProduct.price.toLocaleString()}</p>
                      <p className="mb-2 text-gray-700">{quickViewProduct.description}</p>
                      <div className="mb-2 text-sm text-gray-500">Sizes: {quickViewProduct.sizes?.join(', ')}</div>
                      <div className="mb-2 text-sm text-gray-500">Colors: {quickViewProduct.colors?.join(', ')}</div>
                      <div className="flex gap-2 mt-4">
                        <a href={`/product/${quickViewProduct.id}`} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">View Details</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop; 