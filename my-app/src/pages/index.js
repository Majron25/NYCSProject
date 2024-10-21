import dynamic from "next/dynamic";
import ProductC from "../components/Product_Category";
import { useEffect, useState } from "react";

const ImageSlider = dynamic(() => import("./../components/ImageSlider"), {
  ssr: false,
});

const Promotional_Items = dynamic(
  () => import("./../components/Promotional_Items"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [products, setProducts] = useState([]);

  // Fetch products from the API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        console.log("API Response:", data); // Log the response for debugging

        // Access the products array from the response object
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setError("Products data is not an array");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      <ImageSlider />
      <ProductC />
      <Promotional_Items />
      <div className="text-center">DALEJ NIE ZNALAZŁEŚ CZEGO SZUKASZ? LOL</div>
      {/* Display products below the div */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 border border-gray-200">
            <img
              src={product.product_image}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-bold">${product.price}</p>
            <p
              className={`text-sm ${
                product.promotion ? "text-green-500" : "text-red-500"
              }`}
            >
              {product.promotion ? "On Promotion" : "Regular Price"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
