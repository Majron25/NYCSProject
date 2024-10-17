// src/components/KatalogPrzedmiotow.js

import React from 'react';

const KatalogPrzedmiotow = ({ items }) => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Katalog Przedmiotów i mrożonek</h2>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="p-2 border border-gray-300 rounded">
                        {item.name} - {item.price} PLN
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default KatalogPrzedmiotow;
