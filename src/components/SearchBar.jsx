import React, { useRef, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto py-6">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search countries..."
        className="w-full p-2 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors text-gray-800"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
