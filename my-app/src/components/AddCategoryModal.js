import { useState } from "react";

const AddCategoryModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((newCategory) => {
        onAdd(newCategory);
      })
      .catch((error) => console.error("Error adding category:", error));
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg mb-4">Add New Category</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 mr-4">Cancel</button>
          <button onClick={handleSubmit} className="text-blue-500">Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
