import React, { useState, useEffect } from 'react';

const images = [
  "/images/logo/NYCS_logo.png",
  '/images/logo/NYCS_logo.png',
  '/images/logo/NYCS_logo.png',
  // Add more images as needed
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="w-full overflow-hidden pt-1">
      <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Promotion ${index + 1}`}
            className="w-full object-contain h-64 md:h-80 bg-gray-700"
            style={{ flex: '0 0 100%' }} // Ensure each image takes up 100% of the slider's width          
            />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className=" items-start justify-center bg-gray-800 bg-opacity-50 text-white rounded-full p-2"
      >
        &lt;
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className=" items-end justify-center bg-gray-800 bg-opacity-50 text-white rounded-full p-2 focus:outline-none hover:bg-opacity-70"
      >
        &gt;
      </button>
    </div>
  );
};

export default ImageSlider;
