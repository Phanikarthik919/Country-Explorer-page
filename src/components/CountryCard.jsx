import React from 'react';

const CountryCard = ({ country }) => {
  return (
    <div className="bg-white border-4 border-black p-2 ">
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        className="w-full h-32 object-cover grayscale-[0.2]"
      />
      <div className="pt-3">
        <h3 className="font-bold text-gray-900">{country.name.common}</h3>
        <p className="text-xs text-gray-500 mt-1">Capital: {country.capital?.[0] || 'N/A'}</p>
        <p className="text-xs text-gray-500">Population: {country.population?.toLocaleString()}</p>
        <p className="text-xs text-gray-500">Region: {country.region}</p>
      </div>
    </div>
  );
};

export default CountryCard;
