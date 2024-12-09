import { useState, useEffect } from 'react';

const AddProductModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    product_image: '',
    price: '',
    promotion: false,
    category_id: '' ,
  });
  const [categories, setCategories] = useState([]); // State to store categories
  const [error, setError] = useState(null);

  // Fetch categories from the database when the modal opens
  useEffect(() => {
    fetch('/api/categories/categories') // Adjust endpoint if necessary
      .then((response) => response.json())
      .then((data) => setCategories(data.categories)) // Assuming 'categories' is the array in the response
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to create new product
    fetch('/api/products-api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        onAdd(data.product); // Return the new product back to the parent
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category_id"  // Make sure this matches the backend field
              value={formData.category_id}  // Ensure this reflects the state property
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Product Image URL</label>
            <input
              type="text"
              name="product_image"
              value={formData.product_image}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="promotion"
              checked={formData.promotion}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm">Promotion</label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
