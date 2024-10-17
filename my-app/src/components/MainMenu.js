import { useEffect, useState } from "react";
import Link from "next/link";

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.getElementById("current-year").textContent =
      new Date().getFullYear();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen font-bold m-5 max-sm:m-0">
      <header className="bg-gray-900 p-3 text-white flex-auto rounded-lg">
        <nav className="items-center flex  pr-20 pl-20">
          <img
            src="/images/logo/NYCS_logo.png" // Path from the public folder
            alt="NYCS Logo"
            className="h-20 w-auto items-start justify-start" // Ensures the image fits within the container without stretching
          />
          
          
          {/* Hamburger Icon (right side for small screens) */}
          <button
            className="sm:hidden p-2 text-white ml-auto"
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
          {/* Full menu for large screens */}
          <div className="hidden sm:flex space-x-16 ml-auto">
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
            <div className="relative group">
              <Link href="#" className="text-white no-underline hover:text-black">
                Produkty
              </Link>
              <div className="hidden group-hover:block mt-1 rounded-md shadow-lg bg-blue-500">
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
            </div>

            <Link href="/account" className="text-white no-underline">
              Konto
            </Link>
          </div>

          <div className="relative w-80 ml-10">
            <input
              type="text"
              placeholder="Search..."
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

        </nav>

        {/* Mobile Menu (shown on small screens) */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-4 space-y-2 bg-gray-600 text-white p-4">
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
              <Link href="/kategorie" className="block no-underline ml-4">
                Kategorie
              </Link>
              <Link href="/oferty" className="block no-underline ml-4">
                Oferty
              </Link>
              <Link href="/promocje" className="block no-underline ml-4">
                Promocje
              </Link>
            </div>

            <Link href="/account" className="block no-underline">
              Konto
            </Link>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="text-center bottom-0 w-full">
        <p>
          © <span id="current-year"></span> NYCS - All rights reserved
        </p>
      </footer>
    </div>
  );
}
