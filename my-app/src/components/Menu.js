// src/components/Menu.js

import { useState } from "react";
import Link from "next/link";

const Menu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <header className="bg-gray-900 p-3 text-white rounded-lg">
        <nav className="items-center flex mr-10">
          <Link href="/">
            <img
              src="/images/logo/NYCS_logo.png" // Path from the public folder
              alt="NYCS Logo"
              className="h-20 w-auto items-start justify-start mx-6" // Ensures the image fits within the container without stretching
            />
          </Link>
          <div className="relative mx-4 flex-grow m-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-4 pr-10 rounded-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <img
                src="favicon.ico"
                className="h-5 w-auto"
                alt="...."
              />
            </div>
          </div>
          <div className="hidden xl:flex space-x-16 ml-10 items-center">
            <Link href="/about" className="text-white no-underline hover:text-black">O Nas</Link>
            <Link href="/contact" className="text-white no-underline hover:text-black">Kontakt</Link>
            <div className="relative">
              <Link href="#" className="text-white no-underline hover:text-black" onClick={toggleDropdown}>
                Produkty
              </Link>
              {isDropdownOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 rounded-md shadow-lg bg-blue-500 p-5 w-56 z-10">
                  <Link href="/kategorie" className="block py-2 text-white no-underline hover:text-black">Kategorie</Link>
                  <Link href="/oferty" className="block py-2 text-white no-underline hover:text-black">Oferty</Link>
                  <Link href="/promocje" className="block py-2 text-white no-underline hover:text-black">Promocje</Link>
                </div>
              )}
            </div>
            <Link href="/account" className="text-white no-underline">Konto</Link>
          </div>
          <button className="xl:hidden p-2 text-white ml-auto" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-gray-600 text-white p-4">
          <Link href="/" className="block no-underline">Strona Główna</Link>
          <Link href="/about" className="block no-underline">O Nas</Link>
          <Link href="/contact" className="block no-underline">Kontakt</Link>
          <div>
            <p className="font-bold">Produkty</p>
            <Link href="/kategorie" className="block no-underline">Kategorie</Link>
            <Link href="/oferty" className="block no-underline">Oferty</Link>
            <Link href="/promocje" className="block no-underline">Promocje</Link>
          </div>
          <Link href="/account" className="block no-underline">Konto</Link>
        </div>
      )}
    </>
  );
};

export default Menu;
