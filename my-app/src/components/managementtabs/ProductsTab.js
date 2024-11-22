import { useEffect, useState } from "react";
import EditProductModal from '../EditProductModal';
import AddProductModal from '../AddProductModal';
import SearchBar from '../SearchBarManagement';

const ProductsTab = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // New state for category filter

  useEffect(() => {
    fetch("/api/products-api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      });

    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const refreshProducts = () => {
    fetch("/api/products-api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch((error) => {
        console.error("Error refreshing products:", error);
      });
  };

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    
    if (categoryId === "") {
      setFilteredProducts(products); // Show all products when no category is selected
    } else {
      const filtered = products.filter(
        (product) => product.category_id === Number(categoryId) // Convert categoryId to a number for comparison
      );
      setFilteredProducts(filtered);
      console.log(filtered); // Debugging output to check the filtered products
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "No Category";
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProductToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };
  
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const deleteProduct = () => {
    fetch(`/api/products-api/${productToDelete.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts(products.filter((p) => p.id !== productToDelete.id));
        setFilteredProducts(filteredProducts.filter((p) => p.id !== productToDelete.id));
        closeDeleteModal();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-5xl">
        <h2 className="text-center text-2xl font-bold mb-6">Manage Products</h2>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <SearchBar onSearch={handleSearch} />
            <select
              className="border rounded px-2 py-1"
              value={selectedCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={openAddModal}
          >
            Add New Product
          </button>
        </div>

        <table className="min-w-full table-auto border-collapse text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Promotion</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
                <tr key={product?.id || Math.random()} className="border-b">
                  <td className="px-4 py-2">{product?.id || "N/A"}</td>
                  <td className="px-4 py-2">{product?.name || "Unnamed"}</td>
                  <td className="px-4 py-2">{getCategoryName(product?.category_id) || "No Category"}</td>
                  <td className="px-4 py-2">{product?.description || "No Description"}</td>
                  <td className="px-4 py-2">{product?.price ? `${product.price}zł` : "No Price"}</td>
                  <td className="px-4 py-2">{product?.promotion ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-500 hover:underline mr-4"
                      onClick={() => openEditModal(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => openDeleteModal(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <EditProductModal
            product={selectedProduct}
            categories={categories}
            onClose={closeEditModal}
            onUpdate={(updatedProduct) => {
              setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
              setFilteredProducts(filteredProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
              closeEditModal();
              refreshProducts();
            }}
          />
        )}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg mb-4">Are you sure you want to delete {productToDelete.name}?</h3>
              <div className="flex justify-end">
                <button className="mr-4 text-gray-500" onClick={closeDeleteModal}>
                  Cancel
                </button>
                <button className="text-red-500" onClick={deleteProduct}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {isAddModalOpen && (
          <AddProductModal
            onClose={closeAddModal}
            onAdd={(newProduct) => {
              setProducts([newProduct, ...products]);
              setFilteredProducts([newProduct, ...filteredProducts]);
              closeAddModal();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsTab;
