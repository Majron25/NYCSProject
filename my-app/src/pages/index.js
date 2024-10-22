import { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import ProductC from '../components/Product_Category';

const ImageSlider = dynamic(()=> import("./../components/ImageSlider"), {
  ssr: false,
}); 

const Promotional_Items = dynamic(()=> import("./../components/Promotional_Items"), {
  ssr: false,
}); 

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the products from the API
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        // Access the rows array that contains the product data
        setProducts(data.products.rows || []);  // Fallback to an empty array if undefined
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);    

  return (
    <div className="space-y-6">
      <ImageSlider /> 
      <ProductC />
      <Promotional_Items />
      <div className="text-center">DALEJ NIE ZNALAZŁEŚ CZEGO SZUKASZ? LOL</div>

      {/* Display products below */}
      <div className="flex">
        {products.map((product) => (
          <div key={product.id} className="p-4 border border-gray-200">
            <img src={product.product_image} alt={product.name} className="w-full h-auto" />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-bold">Price: ${product.price}</p>
            {product.promotion && <p className="text-red-500">On Sale!</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
