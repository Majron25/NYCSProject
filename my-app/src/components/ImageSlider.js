import React, { useState, useEffect } from 'react';
import 'tw-elements';

const images = [
  "/images/promocje/Promocja1.jpeg",
  "/images/promocje/Promocja2.jpg",
  "/images/promocje/Promocja3.jpg",
  // Add more images as needed
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + images.length) % images.length
    );
  };

  // Automatically switch images every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 15000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div id="carouselExample" className="relative w-full mt-4 bg-gray-700" data-te-carousel-init data-te-carousel-slide>
      <div className="relative w-full overflow-hidden">
        {/* Slides */}
        <div className="flex transition-transform duration-700 max-h-96" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Promotion ${index + 1}`}
              className="object-cover" // Use object-cover and object-center to cover the container and center the image
              style={{ flex: '0 0 100%' }} // Ensure each image takes up 100% of the slider's width
            />
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => { prevSlide(); clearInterval(); }}
        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[5%] items-center justify-center border-0 bg-transparent p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        data-te-carousel-prev
      >
        <span>&lt;</span>
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => { nextSlide(); clearInterval(); }}
        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[5%] items-center justify-center border-0 bg-transparent p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        data-te-carousel-next
      >
        <span>&gt;</span>
      </button>
      {/* Carousel indicators (optional) */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0">
        {images.map((_, index) => (
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

export default ImageSlider;
