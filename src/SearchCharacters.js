import React from 'react';

const SearchCharacters = ({ query, onChange: handleChange }) => {
  return (
    <input
      onChange={event => handleChange(event.target.value)}
      placeholder="Search Here"
      type="search"
      value={query}
    />
  );
};

export default SearchCharacters;
