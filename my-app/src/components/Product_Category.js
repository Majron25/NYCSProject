import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';  // For routing to the products page

const Product_Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();


  // Fetch categories when the component mounts
  useEffect(() => {
    fetch("/api/categories/categories")
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

  // Handle category click - navigate to products page with category id
  const handleCategoryClick = (categoryId) => {
    router.push(`/products?category=${categoryId}`);  // Redirect to the products page with category query parameter
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-wrap justify-center gap-16 max-w-full p-5 mt-1 h-auto">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleCategoryClick(category.id)} // On click, navigate to products page with category id
        >
          <img src={category.icon || "/icons/default-product-image.jpg"} alt={category.name} className="h-24 w-24" />
          <span className="text-lg">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Product_Category;
