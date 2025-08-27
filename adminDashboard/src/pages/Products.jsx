import React, { useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "BLACK CORAL HEIST T-SHIRT", category: "T-Shirts", price: 4495, stock: "In Stock" },
    { id: 2, name: "WHITE BASIC T-SHIRT", category: "T-Shirts", price: 1299, stock: "In Stock" },
    { id: 3, name: "BLUE GRAPHIC TEE", category: "T-Shirts", price: 1599, stock: "Out of Stock" },
    { id: 4, name: "GREEN SPORTS TEE", category: "Sportswear", price: 1999, stock: "In Stock" },
    { id: 5, name: "RED CASUAL TEE", category: "Casual", price: 999, stock: "In Stock" },
    { id: 6, name: "YELLOW SUMMER TEE", category: "T-Shirts", price: 1299, stock: "In Stock" },
    { id: 7, name: "GREY OVERSIZED TEE", category: "Casual", price: 1799, stock: "In Stock" },
    { id: 8, name: "BLACK POLO SHIRT", category: "Polos", price: 2299, stock: "Out of Stock" },
    { id: 9, name: "MAROON CLASSIC TEE", category: "T-Shirts", price: 1399, stock: "In Stock" },
    { id: 10, name: "ORANGE TRENDY TEE", category: "T-Shirts", price: 1499, stock: "In Stock" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ id: null, name: "", category: "", price: "", stock: "In Stock" });

  const openAddModal = () => {
    setFormData({ id: null, name: "", category: "", price: "", stock: "In Stock" });
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setFormData(product);
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (editingProduct) {
      // Edit existing
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...formData, price: Number(formData.price) } : p)));
    } else {
      // Add new
      const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      setProducts([...products, { ...formData, id: newId, price: Number(formData.price) }]);
    }
    setIsModalOpen(false);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <button
        onClick={openAddModal}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Product
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">₹{product.price}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => openEditModal(product)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">{editingProduct ? "Edit Product" : "Add Product"}</h2>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <select
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
