// components/Layout.js
import Link from 'next/link';

export default function Layout({ children }) {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>{children}</main>

            <footer>
                <p>© 2024 NYCS - All rights reserved</p>
            </footer>

            <style jsx>{`
        header {
          background-color: #333;
          padding: 10px;
          color: white;
        }
        nav ul {
          list-style: none;
          display: flex;
          gap: 20px;
        }
        nav a {
          color: white;
          text-decoration: none;
        }
        footer {
          text-align: center;
          background-color: black;
          position: bottom;
          bottom: 0;
          width: 100%;
        }
      `}</style>
        </div>
    );
}
