import { useEffect, useState } from "react";
import Image from "next/image";  // Assuming you're using Next.js Image for optimized images

export default function ProductsCategories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching products...');
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
  
    fetch("/api/categories/categories")
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
  }, []);  // Empty dependency array to run only once  

  // Handle search functionality
  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "No Category";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  //TO DO: Include images, add the add to cart functionality.
  return (
    <main>
      <div className="container mx-auto p-6 bg-gray-200 shadow-3">
        <h1 className="text-3xl font-bold text-center mb-6">What are you looking for?</h1>
        <div className="mb-6 text-center">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => handleSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full max-w-md mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product?.id || Math.random()}
              className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-all flex flex-col"
            >
              <Image
                src={product?.image || "/icons/default-product-image.jpg"}  // Default image if none
                alt={product?.name || "Product image"}
                width={300}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-semibold">{product?.name || "Unnamed Product"}</h3>
                <td className="text-gray-500">{getCategoryName(product?.category_id) || "No Category"}</td>
                <p className="font-bold text-xl">{product?.price ? `${product.price}zł` : "Price unavailable"}</p>
                <button className="mt-auto w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
