import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Layout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="min-h-screen font-bold m-10">
            <div className="flex items-center justify-center h-24 w-full">
                <p>PLACEHOLDER FOR IMAGE OR SMTH</p>
            </div>
            <header className="bg-gray-800 p-3 text-white flex-auto">
                <nav className="flex justify-end items-center">
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
                    <div className="hidden sm:flex space-x-16">
                        <Link href="/" className="text-white no-underline">Strona Główna</Link>
                        <Link href="/about" className="text-white no-underline">O Nas</Link>
                        <Link href="/contact" className="text-white no-underline">Kontakt</Link>

                        {/* Dropdown for Produkty */}
                        <div className="relative group">
                            <Link href="#" className="text-white no-underline">
                                Produkty
                            </Link>
                            <div className="hidden group-hover:block mt-1 rounded-md shadow-lg">
                                <Link href="/kategorie" className="block py-2 text-white no-underline hover:bg-gray-600">
                                    Kategorie
                                </Link>
                                <Link href="/oferty" className="block py-2 text-white no-underline hover:bg-gray-600">
                                    Oferty
                                </Link>
                                <Link href="/promocje" className="block py-2 text-white no-underline hover:bg-gray-600">
                                    Promocje
                                </Link>
                            </div>
                        </div>

                        <Link href="/account" className="text-white no-underline">Konto</Link>
                    </div>
                </nav>

                {/* Mobile Menu (shown on small screens) */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden mt-4 space-y-2 bg-gray-700 text-white p-4">
                        <Link href="/" className="block no-underline">Strona Główna</Link>
                        <Link href="/about" className="block no-underline">O Nas</Link>
                        <Link href="/contact" className="block no-underline">Kontakt</Link>

                        {/* Dropdown for Produkty */}
                        <div>
                            <p className="font-bold">Produkty</p>
                            <Link href="/kategorie" className="block no-underline ml-4">Kategorie</Link>
                            <Link href="/oferty" className="block no-underline ml-4">Oferty</Link>
                            <Link href="/promocje" className="block no-underline ml-4">Promocje</Link>
                        </div>

                        <Link href="/account" className="block no-underline">Konto</Link>
                    </div>
                )}
            </header>
            <main>
                {children}
            </main>
            <footer className="text-center bottom-0 w-full">
                <p>© <span id="current-year"></span> NYCS - All rights reserved</p>
            </footer>
        </div>
    );
}
