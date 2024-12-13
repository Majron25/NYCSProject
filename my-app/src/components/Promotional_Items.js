import React, { useState, useEffect } from 'react';
import 'tw-elements';
import Image from 'next/image';  // Assuming you're using Next.js Image for optimized images

const Promotional_Items = () => {
  const [products, setProducts] = useState([]); // Store the products with promotion
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeButton, setActiveButton] = useState(null); // State to track active button
  const itemsToShow = 6; // Number of items to show at once

  useEffect(() => {
    // Fetch products that have the promotion set to true
    fetch("/api/products-api/products")  // Adjust the API endpoint if necessary
      .then((response) => response.json())
      .then((data) => {
        const promotedProducts = data.products.filter(product => product.promotion === true);
        setProducts(promotedProducts);
      })
      .catch((error) => {
        console.error("Error fetching promotional products:", error);
      });
  }, []);

  // Function to move to the next slide
  const nextSlide = () => {
    if (currentIndex < Math.ceil(products.length / itemsToShow) - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setActiveButton('next'); // Set active button to 'next'
      setTimeout(() => setActiveButton(null), 3000); // Reset after 300ms
    }
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setActiveButton('prev'); // Set active button to 'prev'
      setTimeout(() => setActiveButton(null), 3000); // Reset after 300ms
    }
  };

  return (
    <div id="promotionalCarousel" className="relative w-full mt-1" data-te-carousel-init data-te-carousel-slide>
      <div className="relative w-full overflow-hidden p-4">
        {/* Slides */}
        <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)` }}>
          {products.map((product, index) => (
            <div key={product?.id} className="flex-shrink-0 w-1/6 p-4"> {/* Each item takes 1/6 of the width */}
              <button
                className='
                  hover:bg-blue-300 hover:text-white 
                  transition-all duration-300 
                  shadow-lg hover:shadow-xl 
                  rounded-md
                  focus:outline-none 
                  p-4
                  w-full
                  flex flex-col justify-between
                  h-full gap-2
                  '
              >
              <div className="flex-grow">  {/* Content section */}
                <Image
                  src={product?.image || "/icons/default-product-image.jpg"}  // Default image if none
                  alt={product?.name || "Product image"}
                  width={300}
                  height={300}
                  className="w-full object-contain h-48"
                />
                <p className="text-center font-bold">{product?.name || "Unnamed Product"}</p>
              </div>

              <div className="flex items-center justify-end pt-2">  {/* Price section at the bottom */}
                <p className="text-center font-semibold text-red-500">Promo Price! Only: {product?.price}</p>
              </div>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className={`absolute bg-none bottom-0 left-0 top-1/3 z-[1] flex w-[2%] h-[25%] items-center justify-center border-0 p-0 text-center text-white ${activeButton === 'prev' ? ' opacity-70' : 'opacity-30'} transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none`}
        data-te-carousel-prev
      >
        <span>&lt;</span>
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className={`absolute bg-none bottom-0 right-0 top-1/3 z-[1] flex w-[2%] h-[25%] items-center justify-center border-0 p-0 text-center text-white ${activeButton === 'next' ? ' opacity-70' : 'opacity-30'} transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none`}
        data-te-carousel-next
      >
        <span>&gt;</span>
      </button>

      {/* Carousel indicators */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0">
        {Array.from({ length: Math.ceil(products.length / itemsToShow) }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[1px] border-solid border-transparent ${
              index === currentIndex ? 'bg-white opacity-100' : 'bg-gray-500 opacity-50'
            } transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)]`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Promotional_Items;
