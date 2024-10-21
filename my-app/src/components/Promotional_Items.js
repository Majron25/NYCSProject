// src/components/Promotional_Items.js
import React, { useState } from 'react';
import 'tw-elements';

const images = [
  "/images/logo/NYCS_logo.png",
  "/images/logo/NYCS_logo.png",
  "/images/logo/NYCS_logo.png",
  "/images/logo/NYCS_logo.png",
  "/images/logo/NYCS_logo.png",
  "/images/logo/NYCS_logo.png",
  "/images/logo/NYCS_logo.png",
  "/images/logo/NYCS_logo.png",
  "/images/logo/NYCS_logo.png",
  "/images/logo/NYCS_logo.png",
  "/images/logo/NYCS_logo.png",
  "/images/logo/NYCS_logo.png",
  // Add more images as needed
];

const Promotional_Items = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeButton, setActiveButton] = useState(null); // State to track active button
  const itemsToShow = 6; // Number of items to show at once

  // Function to move to the next slide
  const nextSlide = () => {
    if (currentIndex < Math.ceil(images.length / itemsToShow) - 1) {
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
    <div id="promotionalCarousel" className="relative w-full mt-1 bg-gray-700 " data-te-carousel-init data-te-carousel-slide>
      <div className="relative w-full overflow-hidden">
        {/* Slides */}
        <p className='text-center mt-5'>PROMOCJE !!!</p>
        <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-1/6"> {/* Each item takes 1/6 of the width */}
              <img
                src={image}
                alt={`Promotion ${index + 1}`}
                className="w-full object-contain h-48"
              />
              <p className='text-center font-bold text-warning-800'>Kup MNIE</p>
            </div>
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className={`absolute bottom-0 left-0 top-1/3 z-[1] flex w-[2%] h-[25%] items-center justify-center border-0 p-0 text-center text-white ${activeButton === 'prev' ? 'bg-gray-700 opacity-70' : 'bg-gray-600 opacity-30'} transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none`}
        data-te-carousel-prev
      >
        <span>&lt;</span>
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className={`absolute bottom-0 right-0 top-1/3 z-[1] flex w-[2%] h-[25%] items-center justify-center border-0 p-0 text-center text-white ${activeButton === 'next' ? 'bg-gray-700 opacity-70' : 'bg-gray-600 opacity-30'} transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none`}
        data-te-carousel-next
      >
        <span>&gt;</span>
      </button>

      {/* Carousel indicators (optional)
      <div className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0">
        {Array.from({ length: Math.ceil(images.length / itemsToShow) }).map((_, index) => (
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
      </div> */}
    </div>
  );
};

export default Promotional_Items;
