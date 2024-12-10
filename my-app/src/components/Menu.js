import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from '../context/AuthContext';

const Menu = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth(); // Get user from context

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const logoutTimer = setTimeout(() => {
        handleLogout();
      }, 3600000); // Logout after 1 hour

      return () => clearTimeout(logoutTimer);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUser(parsedUser); // Set user data from stored user data
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null); // Clear user on logout
    router.push('/'); // Redirect to home page
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);  // Close the dropdown when a link is clicked
  };

  return (
    <>
      <header className="bg-gray-900 p-3 text-white rounded-lg">
        <nav className="items-center flex mr-10">
          <Link href="/">
            <img
              src="/images/logo/NYCS_logo.png"
              alt="NYCS Logo"
              className="h-20 w-auto items-start justify-start mx-6"
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
          {(!user || (user && user.role !== 'admin' && user.role !== 'manager')) && (
              <>
                <Link href="/about" className="text-white no-underline hover:text-black">O Nas</Link>
                <Link href="/contact" className="text-white no-underline hover:text-black">Kontakt</Link>
                <div className="relative">
                  <Link href="#" className="text-white no-underline hover:text-black" onClick={toggleDropdown}>
                    Produkty
                  </Link>
                  {isDropdownOpen && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 rounded-md shadow-lg bg-blue-500 p-5 w-56 z-10">
                      <Link href="/products" className="block py-2 text-white no-underline hover:text-black" onClick={handleLinkClick} >Wszystkie Produkty</Link>
                      <Link href="/oferty" className="block py-2 text-white no-underline hover:text-black" onClick={handleLinkClick} >Oferty</Link>
                      <Link href="/promocje" className="block py-2 text-white no-underline hover:text-black" onClick={handleLinkClick} >Promocje</Link>
                    </div>
                  )}
                </div>
              </>
            )}
            {isLoggedIn ? (
              <>
                {/* Hide Konto for Admin/Manager */}
                {user && (user.role !== 'admin' && user.role !== 'manager') && (
                  <Link href="/account" className="text-white no-underline">Konto</Link>
                )}                {/* Show Management Link for Admin/Manager */}
                {user && (user.role === 'admin' || user.role === 'manager') && (
                  <Link href="/management" className="text-white no-underline hover:text-black">Management</Link>
                )}
                <button onClick={handleLogout} className="text-white no-underline">Logout</button>
              </>
            ) : (
              <Link href="/login" className="text-white no-underline">Logowanie</Link>
            )}
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
            <Link href="/products" className="block no-underline">Wszystkie Produkty</Link>
            <Link href="/oferty" className="block no-underline">Oferty</Link>
            <Link href="/promocje" className="block no-underline">Promocje</Link>
          </div>
          {isLoggedIn ? (
            <>
              <Link href="/account" className="block no-underline">Konto</Link>
              {/* Show Management Link for Admin/Manager in Mobile Menu */}
              {user && (user.role === 'admin' || user.role === 'manager') && (
                <Link href="/management" className="block no-underline">Management</Link>
              )}
              <button onClick={handleLogout} className="block no-underline">Logout</button>
            </>
          ) : (
            <Link href="/login" className="block no-underline">Logowanie</Link>
          )}
        </div>
      )}
    </>
  );
};

export default Menu;
