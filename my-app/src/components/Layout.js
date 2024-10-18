// src/components/Layout.js

import { useEffect } from "react";
import Menu from "./Menu"; // Adjust the import path if necessary

export default function Layout({ children }) {
  useEffect(() => {
    document.getElementById("current-year").textContent =
      new Date().getFullYear();
  }, []);

  return (
    <div className="min-h-screen font-bold flex flex-col items-center">
      <div className="w-4/5 flex-grow flex flex-col">
        <Menu />
        <main>{children}</main>
        <footer className="text-center bottom-0 w-full">
          <p>
            © <span id="current-year"></span> NYCS - All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
}
