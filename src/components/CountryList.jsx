import React from 'react';
import CountryCard from './CountryCard';

const CountryList = ({ countries }) => {
  if (countries.length === 0) {
    return <div className="text-center py-10 text-gray-500">No countries found matching your search.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3 || country.name.common}
          country={country}
        />
      ))}
    </div>
  );
};

export default CountryList;
