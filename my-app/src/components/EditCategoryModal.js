import { useState } from "react";

const EditCategoryModal = ({ category, onClose, onUpdate }) => {
  const [name, setName] = useState(category.name);

  const handleSubmit = () => {
    fetch(`/api/categories/${category.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((updatedCategory) => {
        onUpdate(updatedCategory);
      })
      .catch((error) => console.error("Error updating category:", error));
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg mb-4">Edit Category</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 mr-4">Cancel</button>
          <button onClick={handleSubmit} className="text-blue-500">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
