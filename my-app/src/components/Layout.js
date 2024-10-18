import { useEffect, useState } from "react";
import Link from "next/link";

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for the dropdown

  useEffect(() => {
    document.getElementById("current-year").textContent =
      new Date().getFullYear();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown state
  };

  return (
  <div className="min-h-screen font-bold max-lg:m-0 pt-5">
      <header className="bg-gray-900 p-3 text-white flex rounded-lg items-center justify-center">
        <nav className="items-center flex w-4/6">
          <img
            src="/images/logo/NYCS_logo.png" // Path from the public folder
            alt="NYCS Logo"
            className="h-20 w-auto items-start justify-start" // Ensures the image fits within the container without stretching
          />
          <div className="relative mx-4 w-80">
            <input
              type="text"
              placeholder="Search...aa"
              className="w-full p-2 pl-4 pr-10 rounded-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Search Icon */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <img
              src="favicon.ico"
              className="h-5 w-auto"
              alt="...."
              />
            </div>
          </div>
          <div>asdadasda</div>
          {/* Full menu for large screens */}
          <div className="hidden lg:flex space-x-16 ml-auto items-center">
            <Link href="/" className="text-white no-underline hover:text-black">
              Strona Główna
            </Link>
            <Link href="/about" className="text-white no-underline hover:text-black">
              O Nas
            </Link>
            <Link href="/contact" className="text-white no-underline hover:text-black">
              Kontakt
            </Link>

            {/* Dropdown for Produkty */}
            <div className="relative">
              <Link href="#" className="text-white no-underline hover:text-black" onClick={toggleDropdown}>
                Produkty
              </Link>
              {/* Show dropdown based on isDropdownOpen state */}
              {isDropdownOpen && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 rounded-md shadow-lg bg-blue-500 p-5 w-56 z-10"> {/* Center the dropdown */}
                  <Link
                    href="/kategorie"
                    className="block py-2 text-white no-underline hover:text-black"
                  >
                    Kategorie
                  </Link>
                  <Link
                    href="/oferty"
                    className="block py-2 text-white no-underline hover:text-black"
                  >
                    Oferty
                  </Link>
                  <Link
                    href="/promocje"
                    className="block py-2 text-white no-underline hover:text-black"
                  >
                    Promocje
                  </Link>
                </div>
              )}
            </div>

            <Link href="/account" className="text-white no-underline">
              Konto
            </Link>
          </div>
          
          {/* Hamburger Icon (right side for small screens) */}
          <button
            className="lg:hidden p-2 text-white ml-auto"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </nav>
      </header>
      {/* Mobile Menu (shown on small screens) */}
      {isMobileMenuOpen && (
        <div className=" bg-gray-600 text-white p-4"> {/* Full-width menu */}
            <Link href="/" className="block no-underline">
              Strona Główna
            </Link>
            <Link href="/about" className="block no-underline">
              O Nas
            </Link>
            <Link href="/contact" className="block no-underline">
              Kontakt
            </Link>

            {/* Dropdown for Produkty */}
            <div>
              <p className="font-bold">Produkty</p>
              <Link href="/kategorie" className="block no-underline">
                Kategorie
              </Link>
              <Link href="/oferty" className="block no-underline">
                Oferty
              </Link>
              <Link href="/promocje" className="block no-underline">
                Promocje
              </Link>
            </div>

            <Link href="/account" className="block no-underline">
              Konto
            </Link>
          </div>
        )}
      <main>{children}</main>
      <footer className="text-center bottom-0 w-full">
        <p>
          © <span id="current-year"></span> NYCS - All rights reserved
        </p>
      </footer>
    </div>
  );
}
