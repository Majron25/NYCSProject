import { useEffect, useState } from "react";
import EditProductModal from '../EditProductModal';
import AddProductModal from '../AddProductModal';  // Import the Add Product Modal

const ProductsTab = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State to manage Add Modal

  // Fetch the products from the API when the component mounts
  useEffect(() => {
    fetch("/api/products-api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products); // assuming 'products' is the array of products
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  // Function to refresh the products list after an update
  const refreshProducts = () => {
    fetch("/api/products-api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products); // Update the product list
      })
      .catch((error) => {
        console.error("Error refreshing products:", error);
      });
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
    // Make API request to delete the product
    fetch(`/api/products-api/${productToDelete.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts(products.filter(p => p.id !== productToDelete.id)); // Remove product from state
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

      {/* Button to Open Add Product Modal, positioned on the right */}
      <div className="flex justify-end">
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={openAddModal}
        >
          Add New Product
        </button>
      </div>

        {/* Display the products in a table */}
        <table className="min-w-full table-auto border-collapse text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Promotion</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">{product.price} zł</td>
                <td className="px-4 py-2">{product.promotion ? "Yes" : "No"} </td>
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

        {/* Edit Product Modal */}
        {isModalOpen && (
          <EditProductModal
            product={selectedProduct}
            onClose={closeEditModal}
            onUpdate={(updatedProduct) => {
              // Update the local product list with the updated product
              setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
              closeEditModal();
              refreshProducts();
            }}
          />
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg mb-4">Are you sure you want to delete {productToDelete.name}?</h3>
              <div className="flex justify-end">
                <button
                  className="mr-4 text-gray-500"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  className="text-red-500"
                  onClick={deleteProduct}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Add Product Modal */}
        {isAddModalOpen && (
          <AddProductModal
            onClose={closeAddModal}
            onAdd={(newProduct) => {
              setProducts([newProduct, ...products]); // Prepend new product to the list
              closeAddModal();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsTab;
