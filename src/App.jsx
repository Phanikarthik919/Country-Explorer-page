import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useRef — Persistence without re-render (holding the timeout ID)
  const debounceTimeout = useRef(null);

  // Initial Fetch: useEffect in depth
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,population,region');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Search Logic with Debounce
  const handleSearch = (query) => {
    // Clear previous timeout if it exists
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout (Debouncing)
    debounceTimeout.current = setTimeout(() => {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filtered);
    }, 500); // 500ms delay
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Country Explorer
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="text-center py-20 text-gray-500">
            <p className="animate-pulse">Loading countries...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <CountryList countries={filteredCountries} />
        )}
      </main>
    </div>
  );
}

export default App;
