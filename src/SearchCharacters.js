import React from 'react';

const SearchCharacters = ({ query, onChange: handleChange }) => {
  return (
    <input
      onChange={handleChange}
      placeholder="Search Here"
      type="search"
      value={query}
    />
  );
};

export default SearchCharacters;
