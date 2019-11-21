import React from 'react';

const SearchCharacters = () => {
  return (
    <input
      onChange={event => console.log(event.target.value)}
      placeholder="Search Here"
      type="search"
      value={''}
    />
  );
};

export default SearchCharacters;
