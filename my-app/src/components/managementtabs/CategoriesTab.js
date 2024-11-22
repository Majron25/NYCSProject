import { useEffect, useState } from "react";
import EditCategoryModal from '../EditCategoryModal';
import AddCategoryModal from '../AddCategoryModal';

const CategoriesTab = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch categories when the component mounts
  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories); // assuming 'categories' is the array of categories
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories");
        setLoading(false);
      });
  }, []);

  const refreshCategories = () => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Error refreshing categories:", error));
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedCategory(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setCategoryToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const deleteCategory = () => {
    console.log("Category to delete:", categoryToDelete.id);
    if (!categoryToDelete || !categoryToDelete.id) {
      console.error("Category id not found");
      return;
    }

    
    fetch(`/api/categories/${categoryToDelete.id}`, { method: "DELETE" })
      .then(() => {
        setCategories(categories.filter(c => c.id !== categoryToDelete.id));
        closeDeleteModal();
      })
      .catch((error) => console.error("Error deleting category:", error));
  };  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-5xl">
        <h2 className="text-center text-2xl font-bold mb-6">Manage Categories</h2>
        
        {/* Search Bar (if needed) */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button onClick={openAddModal} className="px-4 py-2 bg-blue-500 text-white rounded">Add New Category</button>
          </div>
        </div>

        {/* Categories Table */}
        <table className="min-w-full table-auto border-collapse text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b">
                <td className="px-4 py-2">{category.id}</td>
                <td className="px-4 py-2">{category.name}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:underline mr-4" onClick={() => openEditModal(category)}>
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline" onClick={() => openDeleteModal(category)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modals for Add/Edit/Delete Actions */}
        {isEditModalOpen && (
          <EditCategoryModal
            category={selectedCategory}
            onClose={closeEditModal}
            onUpdate={(updatedCategory) => {
              setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
              closeEditModal();
              refreshCategories();
            }}
          />
        )}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg mb-4">Are you sure you want to delete {categoryToDelete.name}?</h3>
              <div className="flex justify-end">
                <button className="mr-4 text-gray-500" onClick={closeDeleteModal}>Cancel</button>
                <button className="text-red-500" onClick={deleteCategory}>Delete</button>
              </div>
            </div>
          </div>
        )}
        {isAddModalOpen && (
          <AddCategoryModal
            onClose={closeAddModal}
            onAdd={(newCategory) => {
              setCategories([newCategory, ...categories]);
              closeAddModal();
              refreshCategories();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CategoriesTab;
