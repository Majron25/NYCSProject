// components/Product_Category.js
import React from 'react';

const categories = [
  { name: 'Wina', icon: "/images/logo/NYCS_logo.png" },
  { name: 'Whiskey', icon: "/images/logo/NYCS_logo.png" },
  { name: 'Wódka', icon: "/images/logo/NYCS_logo.png" },
  { name: 'Likiery', icon: "/images/logo/NYCS_logo.png" },
  { name: 'Rum', icon: "/images/logo/NYCS_logo.png" },
  { name: 'Vermouth', icon: "/images/logo/NYCS_logo.png" },
  { name: 'Koniak', icon: "/images/logo/NYCS_logo.png" },
  { name: 'Tequila', icon: "/images/logo/NYCS_logo.png" },
  { name: 'Gin', icon: "/images/logo/NYCS_logo.png" },
  // Add more categories as needed
];

const Product_Category = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 max-w-full p-5 mt-1 bg-gray-700 "> {/* Adjust here */}
      {categories.map((category, index) => (
        <div key={index} className="flex flex-col items-center">
          <img src={category.icon} alt={category.name} className="h-24 w-24 hover:cursor-pointer" />
          <span className="text-sm mt-1">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Product_Category;
