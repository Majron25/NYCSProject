// pages/about.js
import KatalogPrzedmiotow from '../components/KatalogPrzedmiotów';

export default function About() {

  const items = [
    { name: 'Produkt 1', price: 400 },
    { name: 'Produkt 2', price: 500 },
  ];

    return (
        <div className=" sm:p-20 ">        
      <ul className="list-decimal">
            <KatalogPrzedmiotow items={items} />
            <li className="text-orange-500">Now this is a story all about how, my life got flipped-turned upside down</li>
            <li>Now this is a story all about how, my life got flipped-turned upside down</li>
            <li>Now this is a story all about how, my life got flipped-turned upside down</li>
            <li>Now this is a story all about how, my life got flipped-turned upside down</li>
        </ul>
      </div>
    );
}
