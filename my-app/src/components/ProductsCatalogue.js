import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function ProductsCatalogue() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");  // Add state for search query
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { category } = router.query;  // Get the category from the query parameter

  // Fetch products and categories from the API
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

  useEffect(() => {
    // Filter products based on the category and search query
    let filtered = products;

    if (category) {
      filtered = filtered.filter(product => product.category_id === parseInt(category));
    }

    if (searchQuery) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredProducts(filtered);
  }, [category, searchQuery, products]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);  // Update search query state
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "No Category";
  };

  //if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main>
      <div className=" mx-auto p-6 bg-gray-200 shadow-3">
        <h1 className="text-3xl font-bold text-center mb-6">What are you looking for?</h1>
        
        {/* Search bar */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}  // Set input value to search query state
              onChange={handleSearch}  // Update search query on change
              className="border px-4 py-2 h-12 rounded-lg w-full" // Set consistent height
              />
          </div>

          {/* Category Filter */}
          <div className="text-center">
            <select
              value={category || ""}
              onChange={(e) => router.push(`/products?category=${e.target.value}`)}  // Update category query parameter on change
              className="border px-4 py-2 h-12 rounded-lg w-full" // Match height with input
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Display filtered products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product?.id || Math.random()}
              className="border rounded-lg p-4 shadow-lg hover:shadow-xl hover:bg-blue-200 transition-all flex flex-col"
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
                <p className="text-gray-500">{getCategoryName(product?.category_id) || "No Category"}</p>
                <p className={`font-bold text-xl ${product?.promotion ? 'text-red-500' : ''}`}>
                  {product?.price ? `${product.price}zł` : "Price unavailable"}
                </p>
                {product?.promotion && (
                  <p className="text-red-500 font-semibold">On Promotion!</p>
                )}
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
