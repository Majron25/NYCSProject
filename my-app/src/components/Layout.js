// components/Layout.js
import { useEffect } from 'react';


export default function Layout({ children }) {
    useEffect(() => {
        //document.getElementById('current-year').textContent = new Date().getFullYear();
    }, []);

    return (
        <div>
            <ul className="list-disc p-20 ">
                <li className="text-orange-500">Now this is a story all about how, my life got flipped-turned upside down</li>
                <li>Now this is a story all about how, my life got flipped-turned upside down</li>
                <li>Now this is a story all about how, my life got flipped-turned upside down</li>
                <li>Now this is a story all about how, my life got flipped-turned upside down</li>
            </ul>
        <main>{children}</main>
        </div>
    );
}

