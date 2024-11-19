import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query); // Trigger search when the button is clicked or enter is pressed
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search products..."
        className="p-2 rounded-md border border-gray-300"
      />
      <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
